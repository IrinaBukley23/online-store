import { WFMComponent } from '../../../routes/index';
import { ComponentConfig, Product } from '../../../types';
import { productsContainer } from '../../components/productsContainer/productsContainer';
import { filter } from '../../components/filter/filter';
import { productsData } from '../../../data/productsData';
import { sortDropdown } from '../../components/sortDropdown/sortDropdown';
import './homePage.scss';
import { textSearch } from '../../components/textSearch/textSearch';
import { foundProductQuantity } from '../../components/foundProductQuantity/foundProductQuantity';

class HomePage extends WFMComponent {
    private productsData: Product[];
    private minStock: string;
    private maxStock: string;
    private minPrice: string;
    private maxPrice: string;

    constructor(config: ComponentConfig) {
        super(config);
        this.productsData = productsData.products;
        this.minStock = this.getMinStockValue();
        this.maxStock = this.getMaxStockValue();
        this.minPrice = this.getMinPriceValue();
        this.maxPrice = this.getMaxPriceValue();
    }

    public getMinStockValue(): string {
        const stock = this.productsData.map((product) => product.stock);
        const min = Math.min(...stock);

        return String(min);
    }

    public getMaxStockValue(): string {
        const stock = this.productsData.map((product) => product.stock);
        const max = Math.max(...stock);

        return String(max);
    }

    public getMinPriceValue(): string {
        const prices = this.productsData.map((product) => product.price);
        const min = Math.min(...prices);

        return String(min);
    }

    public getMaxPriceValue(): string {
        const prices = this.productsData.map((product) => product.price);
        const max = Math.max(...prices);

        return String(max);
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('sort__item')) {
            const sortType: string | undefined = target.dataset.sort;

            this.sortProducts(target, sortType);
        }
    }

    public handleInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        if (target.classList.contains('category-checkbox')) {
            this.handleCategoryCheckbox(target);
            this.changeActiveBrandCheckboxes();
        }

        if (target.classList.contains('brand-checkbox')) {
            this.handleBrandCheckbox(target);
            this.changeActiveCategoryCheckboxes();
        }

        const stockFromSlider = document.querySelector('dual-slider-stock #fromSlider') as HTMLInputElement;
        const stockToSlider = document.querySelector('dual-slider-stock #toSlider') as HTMLInputElement;
        const priceFromSlider = document.querySelector('dual-slider-price #fromSlider') as HTMLInputElement;
        const priceToSlider = document.querySelector('dual-slider-price #toSlider') as HTMLInputElement;

        if (
            target === stockFromSlider ||
            target === stockToSlider ||
            target === priceFromSlider ||
            target === priceToSlider
        ) {
            this.showChosenCards(target);
            this.changeActiveBrandCheckboxes();
            this.changeActiveCategoryCheckboxes();
        }
    }

    public handleOnInput(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('text-search__input')) {
            const inputTarget = target as HTMLInputElement;

            this.showChosenCards(inputTarget);
        }
    }

    private handleCategoryCheckbox(target: HTMLInputElement): void {
        this.showChosenCards(target);
        this.changeDualSlidersValues();
    }

    private handleBrandCheckbox(target: HTMLInputElement): void {
        this.showChosenCards(target);
        this.changeDualSlidersValues();
    }

    private showChosenCards(target: HTMLInputElement): void {
        const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;

        const textInput = this.el?.querySelector('.text-search__input') as HTMLInputElement;

        const stockFromSlider = document.querySelector('dual-slider-stock #fromSlider') as HTMLInputElement;
        const stockToSlider = document.querySelector('dual-slider-stock #toSlider') as HTMLInputElement;
        const priceFromSlider = document.querySelector('dual-slider-price #fromSlider') as HTMLInputElement;
        const priceToSlider = document.querySelector('dual-slider-price #toSlider') as HTMLInputElement;

        const checkedCategoryInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const checkedBrandInputs = document.querySelectorAll('.brand-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];
        const chosenBrands: (string | undefined)[] = [];

        if (
            target !== priceFromSlider &&
            target !== priceToSlider &&
            target !== stockFromSlider &&
            target !== stockToSlider
        ) {
            priceFromSlider.value = this.minPrice;
            priceToSlider.value = this.maxPrice;
            stockFromSlider.value = this.minStock;
            stockToSlider.value = this.maxStock;

            priceFromSlider.dispatchEvent(new Event('change'));
            priceToSlider.dispatchEvent(new Event('change'));
            stockFromSlider.dispatchEvent(new Event('change'));
            stockToSlider.dispatchEvent(new Event('change'));
        }

        const minPrice: string = priceFromSlider.value;
        const maxPrice: string = priceToSlider.value;
        const minStock: string = stockFromSlider.value;
        const maxStock: string = stockToSlider.value;

        checkedCategoryInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenCategories.push(labelText);
            }
        });

        checkedBrandInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenBrands.push(labelText);
            }
        });

        productCards.forEach((card) => {
            card.classList.remove('d-none');

            if (chosenCategories.length && chosenBrands.length) {
                if (!chosenCategories.includes(card.dataset.category) || !chosenBrands.includes(card.dataset.brand)) {
                    card.classList.add('d-none');
                }
            } else if (chosenCategories.length) {
                if (!chosenCategories.includes(card.dataset.category)) {
                    card.classList.add('d-none');
                }
            } else if (chosenBrands.length) {
                if (!chosenBrands.includes(card.dataset.brand)) {
                    card.classList.add('d-none');
                }
            }

            if (card.dataset.stock) {
                if (+card.dataset.stock < +minStock || +card.dataset.stock > +maxStock) {
                    card.classList.add('d-none');
                }
            }

            if (card.dataset.price) {
                if (+card.dataset.price < +minPrice || +card.dataset.price > +maxPrice) {
                    card.classList.add('d-none');
                }
            }

            if (textInput.value.trim()) {
                let includesSearchStr = false;
                const currentCardId: string | undefined = card.dataset.id;

                if (currentCardId) {
                    const currentProduct: Product | undefined = productsData.products.find(
                        (product) => +product.id === +currentCardId
                    );

                    if (currentProduct) {
                        const currentProductEntries = Object.entries(currentProduct);

                        currentProductEntries.forEach(([key, value]) => {
                            const strValue = value.toString();

                            if (key !== 'id' && key !== 'thumbnail' && key !== 'images') {
                                if (strValue.toLowerCase().includes(textInput.value.trim().toLowerCase())) {
                                    includesSearchStr = true;
                                }
                            }
                        });
                    }
                }

                if (!includesSearchStr) {
                    card.classList.add('d-none');
                }
            }
        });

        this.showProductQuantity();
    }

    private changeActiveBrandCheckboxes(): void {
        const brandCheckboxes = document.querySelectorAll('.brand-checkbox');

        const checkedCategoryInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];

        if (!checkedCategoryInputs.length) {
            brandCheckboxes.forEach((checkbox) => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.disabled = false;
            });

            return;
        }

        checkedCategoryInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenCategories.push(labelText);
            }
        });

        const activeBrands: Set<string> = new Set();

        this.productsData.forEach((product: Product) => {
            if (chosenCategories.includes(product.category)) {
                activeBrands.add(product.brand);
            }
        });

        brandCheckboxes.forEach((checkbox) => {
            const checkboxInput = checkbox as HTMLInputElement;

            if (checkbox.nextElementSibling) {
                const brandCheckboxText = checkbox.nextElementSibling.textContent as string;
                const trimmedBrandCheckboxText = brandCheckboxText.trim();
                checkboxInput.disabled = !activeBrands.has(trimmedBrandCheckboxText);
                if (checkboxInput.disabled && checkboxInput.checked) {
                    checkboxInput.checked = false;
                }
            }
        });
    }

    private changeActiveCategoryCheckboxes(): void {
        const categoryCheckboxes = document.querySelectorAll('.category-checkbox');

        const checkedBrandInputs = document.querySelectorAll('.brand-filter .form-check-input:checked');
        const chosenBrands: (string | undefined)[] = [];

        if (!checkedBrandInputs.length) {
            categoryCheckboxes.forEach((checkbox) => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.disabled = false;
            });

            return;
        }

        checkedBrandInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenBrands.push(labelText);
            }
        });

        const activeCategories: Set<string> = new Set();

        this.productsData.forEach((product: Product) => {
            if (chosenBrands.includes(product.brand)) {
                activeCategories.add(product.category);
            }
        });

        categoryCheckboxes.forEach((checkbox) => {
            if (checkbox.nextElementSibling) {
                const checkboxInput = checkbox as HTMLInputElement;

                const categoryCheckboxText = checkbox.nextElementSibling.textContent as string;
                const trimmedCategoryCheckboxText = categoryCheckboxText.trim();
                checkboxInput.disabled = !activeCategories.has(trimmedCategoryCheckboxText);
                if (checkboxInput.disabled && checkboxInput.checked) {
                    checkboxInput.checked = false;
                }
            }
        });
    }

    private changeDualSlidersValues(): void {
        const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;

        const stockFromInput = document.querySelector('dual-slider-stock #fromInput') as HTMLInputElement;
        const stockToInput = document.querySelector('dual-slider-stock #toInput') as HTMLInputElement;
        const priceFromInput = document.querySelector('dual-slider-price #fromInput') as HTMLInputElement;
        const priceToInput = document.querySelector('dual-slider-price #toInput') as HTMLInputElement;

        const stockFromSlider = document.querySelector('dual-slider-stock #fromSlider') as HTMLInputElement;
        const stockToSlider = document.querySelector('dual-slider-stock #toSlider') as HTMLInputElement;
        const priceFromSlider = document.querySelector('dual-slider-price #fromSlider') as HTMLInputElement;
        const priceToSlider = document.querySelector('dual-slider-price #toSlider') as HTMLInputElement;

        const arrayCards = Array.prototype.slice.call(productCards);
        const displayedCards = arrayCards.filter((card) => !card.classList.contains('d-none'));

        if (displayedCards.length) {
            let minActiveCardPrice = displayedCards[0].dataset.price;
            let minActiveCardStock = displayedCards[0].dataset.stock;
            let maxActiveCardPrice = displayedCards[0].dataset.price;
            let maxActiveCardStock = displayedCards[0].dataset.stock;

            displayedCards.forEach((card) => {
                if (card.dataset.price && minActiveCardPrice && maxActiveCardPrice) {
                    if (+card.dataset.price < +minActiveCardPrice) {
                        minActiveCardPrice = card.dataset.price;
                    }
                    if (+card.dataset.price > +maxActiveCardPrice) {
                        maxActiveCardPrice = card.dataset.price;
                    }
                }

                if (card.dataset.stock && minActiveCardStock && maxActiveCardStock) {
                    if (+card.dataset.stock < +minActiveCardStock) {
                        minActiveCardStock = card.dataset.stock;
                    }
                    if (+card.dataset.stock > +maxActiveCardStock) {
                        maxActiveCardStock = card.dataset.stock;
                    }
                }
            });

            if (minActiveCardPrice && maxActiveCardPrice && minActiveCardStock && maxActiveCardStock) {
                priceFromSlider.value = minActiveCardPrice;
                priceToSlider.value = maxActiveCardPrice;
                stockFromSlider.value = minActiveCardStock;
                stockToSlider.value = maxActiveCardStock;

                priceFromInput.value = minActiveCardPrice;
                priceToInput.value = maxActiveCardPrice;
                stockFromInput.value = minActiveCardStock;
                stockToInput.value = maxActiveCardStock;

                priceFromSlider.dispatchEvent(new Event('change'));
                priceToSlider.dispatchEvent(new Event('change'));
                stockFromSlider.dispatchEvent(new Event('change'));
                stockToSlider.dispatchEvent(new Event('change'));
                priceFromInput.dispatchEvent(new Event('change'));
                priceToInput.dispatchEvent(new Event('change'));
                stockFromInput.dispatchEvent(new Event('change'));
                stockToInput.dispatchEvent(new Event('change'));
            }
        }
    }

    private sortProducts(target: HTMLElement, sortType: string | undefined): void {
        if (sortType) {
            const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
            const sortProductDropdown = document.querySelector('#sortProductDropdown') as HTMLButtonElement;

            const arrayCards = Array.prototype.slice.call(productCards);
            // const displayedCards = arrayCards.filter((card) => !card.classList.contains('d-none'));

            if (arrayCards.length) {
                if (sortType === 'price-desc') {
                    const sortedCards = arrayCards.sort((a, b) => +b.dataset.price - +a.dataset.price);
                    sortedCards.forEach((card, index) => {
                        card.style.order = `${index + 1}`;
                    });
                } else if (sortType === 'price-asc') {
                    const sortedCards = arrayCards.sort((a, b) => +a.dataset.price - +b.dataset.price);
                    sortedCards.forEach((card, index) => {
                        card.style.order = `${index + 1}`;
                    });
                } else if (sortType === 'discount-desc') {
                    const sortedCards = arrayCards.sort((a, b) => +b.dataset.discount - +a.dataset.discount);
                    sortedCards.forEach((card, index) => {
                        card.style.order = `${index + 1}`;
                    });
                } else if (sortType === 'discount-asc') {
                    const sortedCards = arrayCards.sort((a, b) => +a.dataset.discount - +b.dataset.discount);
                    sortedCards.forEach((card, index) => {
                        card.style.order = `${index + 1}`;
                    });
                }

                sortProductDropdown.innerText = target.innerText;
            }
        }
    }

    private showProductQuantity(): void {
        const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
        const foundProductsQuantityDisplay = document.querySelector('found-product-quantity') as HTMLElement;
        const nothingFoundDisclaimer = document.querySelector('.nothing-found') as HTMLDivElement;

        const arrayCards = Array.prototype.slice.call(productCards);
        const displayedCards = arrayCards.filter((card) => !card.classList.contains('d-none'));
        foundProductsQuantityDisplay.innerText = `Products found: ${displayedCards.length}`;

        if (displayedCards.length) {
            nothingFoundDisclaimer.classList.add('d-none');
        } else {
            nothingFoundDisclaimer.classList.remove('d-none');
        }
    }
}

export const homePage = new HomePage({
    selector: 'home',
    innerComponents: [productsContainer, filter, sortDropdown, textSearch, foundProductQuantity],
    getTemplate: () => `
        <filter class="filter"></filter>
        <main class="main">
            <div class="display-info">
                <sort-dropdown></sort-dropdown>
                <found-product-quantity></found-product-quantity>
                <text-search></text-search>
            </div>
            <products-container class="product__cards"></products-container>
            <div class="nothing-found">No products found.</div>
        </main>
    `,
});
