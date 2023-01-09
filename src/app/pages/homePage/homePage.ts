import { WFMComponent } from '../../../routes/index';
import { ComponentConfig, Product, QueryParams } from '../../../types';
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
    private URL: string;
    private queryParams: QueryParams;

    constructor(config: ComponentConfig) {
        super(config);
        this.productsData = productsData.products;
        this.minStock = this.getMinStockValue();
        this.maxStock = this.getMaxStockValue();
        this.minPrice = this.getMinPriceValue();
        this.maxPrice = this.getMaxPriceValue();
        this.URL = document.URL;
        this.queryParams = this.getQueryParamsFromURL(this.URL);
    }

    public render(): void {
        super.render();
        this.initFilterSearchSortFromQueryParams(this.queryParams);
    }

    private getQueryParamsFromURL(URLStr: string): QueryParams {
        const URLObject = new URL(URLStr);
        const searchParams = new URLSearchParams(URLObject.searchParams);
        return Object.fromEntries(searchParams.entries());
    }


    private initFilterSearchSortFromQueryParams(params: QueryParams, reset?: boolean): void {
        // Restore category
        const categoryInputs = document.querySelectorAll('.category-filter .form-check-input');

        const categoryLabels: (string | undefined)[] = [];

        categoryInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                categoryLabels.push(labelText);
            }
        });

        if (params.category) {
            const paramCategories = params.category.split('_');

            categoryLabels.forEach((label, index) => {
                if (label) {
                    if (paramCategories.includes(label?.trim().toLowerCase())) {
                        const input = categoryInputs[index] as HTMLInputElement;
                        input.checked = true;
                    }
                }
            });
        } else {
            categoryLabels.forEach((label, index) => {
                if (label) {
                    const input = categoryInputs[index] as HTMLInputElement;
                    input.checked = false;
                    input.disabled = false;
                }
            });
        }

        // Restore brands
        const brandInputs = document.querySelectorAll('.brand-filter .form-check-input');

        const brandLabels: (string | undefined)[] = [];

        brandInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                brandLabels.push(labelText);
            }
        });

        if (params.brand) {
            const paramBrands = params.brand.split('_');

            brandLabels.forEach((label, index) => {
                if (label) {
                    if (paramBrands.includes(label?.trim().toLowerCase())) {
                        const input = brandInputs[index] as HTMLInputElement;
                        input.checked = true;
                    }
                }
            });
        } else {
            brandLabels.forEach((label, index) => {
                if (label) {
                    const input = brandInputs[index] as HTMLInputElement;
                    input.checked = false;
                    input.disabled = false;
                }
            });
        }

        // Restore search
        const textInput = this.el?.querySelector('.text-search__input') as HTMLInputElement;

        if (params.search) {
            textInput.value = params.search;
        } else {
            textInput.value = '';
        }

        // Restore sort
        if (params.sort) {
            const sortProductDropdown = document.querySelector('#sortProductDropdown') as HTMLButtonElement;
            const currentSortOption = document.querySelector(`[data-sort="${params.sort}"]`) as HTMLAnchorElement;
            const sortText = currentSortOption.innerText;

            sortProductDropdown.innerText = sortText;

            this.sortProducts(currentSortOption, params.sort);
        }

        this.showChosenCards(null, reset);
        this.changeDualSlidersValues(null);
    }

    private setQueryParams(params: QueryParams) {
        this.queryParams = params;
        const currentURL = new URL(document.URL);
        const searchParamsObj = new URLSearchParams(params);

        currentURL.search = searchParamsObj.toString();
        console.log(searchParamsObj.toString(), currentURL);

        history.pushState('', '', currentURL);
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

        if (target.classList.contains('filter__btn--reset')) {
            const currentURL = new URL(document.URL);
            currentURL.search = '';
            if (this.queryParams.sort) {
                this.setQueryParams({ sort: this.queryParams.sort });
            } else {
                this.setQueryParams({});
            }

            this.initFilterSearchSortFromQueryParams(this.queryParams, true);

            target.innerText = 'Filter is reset';
            target.classList.add('reset');
            setTimeout(() => {
                target.classList.remove('reset');
                target.innerText = 'Reset filter';
            }, 1000);
        }

        if (target.classList.contains('filter__btn--copy')) {
            navigator.clipboard
                .writeText(document.URL)
                .then(() => {
                    target.innerText = 'Filter is copied';
                    target.classList.add('copied');
                    setTimeout(() => {
                        target.classList.remove('copied');
                        target.innerText = 'Copy filter';
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    public handleInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        console.log('change', target);

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

    public handleInput(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('text-search__input')) {
            const inputTarget = target as HTMLInputElement;

            this.showChosenCards(inputTarget);
            this.changeDualSlidersValues(inputTarget);
        }
    }

    private handleCategoryCheckbox(target: HTMLInputElement): void {
        this.showChosenCards(target);
        this.changeDualSlidersValues(target);
    }

    private handleBrandCheckbox(target: HTMLInputElement): void {
        this.showChosenCards(target);
        this.changeDualSlidersValues(target);
    }

    private showChosenCards(target: HTMLInputElement | null, reset?: boolean): void {
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

        const queryParams: QueryParams = {};

        if (textInput.value.trim()) {
            queryParams.search = textInput.value.trim();
        }

        // If the function is invoked not by sliders change, set the range of sliders to maximum (not to limit chosen categories and brands with slider values)

        if (
            target !== priceFromSlider &&
            target !== priceToSlider &&
            target !== stockFromSlider &&
            target !== stockToSlider &&
            target !== textInput
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

        // !!! Those variables (minPrice, maxPrice, minStock, maxStock) are declared after above values might have changed (if this function is triggered not by dual sliders)

        const minPrice: string = priceFromSlider.value;
        const maxPrice: string = priceToSlider.value;
        const minStock: string = stockFromSlider.value;
        const maxStock: string = stockToSlider.value;

        if (!reset) {
            if (minPrice !== this.minPrice || maxPrice !== this.maxPrice) {
                queryParams.price = `${minPrice}_${maxPrice}`;
            } else if (this.queryParams.price) {
                queryParams.price = this.queryParams.price;
            }

            if (minStock !== this.minStock || maxStock !== this.maxStock) {
                queryParams.stock = `${minStock}_${maxStock}`;
            } else if (this.queryParams.stock) {
                queryParams.stock = this.queryParams.stock;
            }
        }

        checkedCategoryInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                chosenCategories.push(labelText);
            }
        });

        if (chosenCategories.length) {
            queryParams.category = chosenCategories.join('_');
        }

        checkedBrandInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                chosenBrands.push(labelText);
            }
        });

        if (chosenBrands.length) {
            queryParams.brand = chosenBrands.join('_');
        }

        productCards.forEach((card) => {
            card.classList.remove('d-none');

            if (chosenCategories.length && chosenBrands.length) {
                if (
                    !chosenCategories.includes(card.dataset.category?.trim().toLowerCase()) ||
                    !chosenBrands.includes(card.dataset.brand?.trim().toLowerCase())
                ) {
                    card.classList.add('d-none');
                }
            } else if (chosenCategories.length) {
                if (!chosenCategories.includes(card.dataset.category?.trim().toLowerCase())) {
                    card.classList.add('d-none');
                }
            } else if (chosenBrands.length) {
                if (!chosenBrands.includes(card.dataset.brand?.trim().toLowerCase())) {
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
                            const strValue = value.toString().trim().toLowerCase();

                            if (key !== 'id' && key !== 'thumbnail' && key !== 'images') {
                                if (strValue.includes(textInput.value.trim().toLowerCase())) {
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

        if (this.queryParams.sort) {
            queryParams.sort = this.queryParams.sort;
        }

        this.setQueryParams(queryParams);
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
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                chosenCategories.push(labelText);
            }
        });

        const activeBrands: Set<string> = new Set();

        this.productsData.forEach((product: Product) => {
            if (chosenCategories.includes(product.category.trim().toLowerCase())) {
                activeBrands.add(product.brand.trim().toLowerCase());
            }
        });

        brandCheckboxes.forEach((checkbox) => {
            const checkboxInput = checkbox as HTMLInputElement;

            if (checkbox.nextElementSibling) {
                const brandCheckboxText = checkbox.nextElementSibling.textContent?.trim().toLowerCase() as string;
                checkboxInput.disabled = !activeBrands.has(brandCheckboxText);
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
                const labelText = input.nextElementSibling.textContent?.trim().toLowerCase();
                chosenBrands.push(labelText);
            }
        });

        const activeCategories: Set<string> = new Set();

        this.productsData.forEach((product: Product) => {
            if (chosenBrands.includes(product.brand.trim().toLowerCase())) {
                activeCategories.add(product.category.trim().toLowerCase());
            }
        });

        categoryCheckboxes.forEach((checkbox) => {
            if (checkbox.nextElementSibling) {
                const checkboxInput = checkbox as HTMLInputElement;

                const categoryCheckboxText = checkbox.nextElementSibling.textContent?.trim().toLowerCase() as string;
                checkboxInput.disabled = !activeCategories.has(categoryCheckboxText);
                if (checkboxInput.disabled && checkboxInput.checked) {
                    checkboxInput.checked = false;
                }
            }
        });
    }

    private changeDualSlidersValues(target: HTMLInputElement | null): void {
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

        if (target === null) {
            if (this.queryParams.stock) {
                const [minStock, maxStock] = this.queryParams.stock.split('_');

                const stockFromSlider = document.querySelector('dual-slider-stock #fromSlider') as HTMLInputElement;
                const stockToSlider = document.querySelector('dual-slider-stock #toSlider') as HTMLInputElement;

                stockFromSlider.value = minStock;
                stockToSlider.value = maxStock;

                stockFromSlider.dispatchEvent(new Event('change'));
                stockToSlider.dispatchEvent(new Event('change'));
            } else {
                stockFromSlider.value = this.minStock;
                stockToSlider.value = this.maxStock;

                stockFromSlider.dispatchEvent(new Event('change'));
                stockToSlider.dispatchEvent(new Event('change'));
            }

            if (this.queryParams.price) {
                const [minPrice, maxPrice] = this.queryParams.price.split('_');

                const priceFromSlider = document.querySelector('dual-slider-price #fromSlider') as HTMLInputElement;
                const priceToSlider = document.querySelector('dual-slider-price #toSlider') as HTMLInputElement;

                priceFromSlider.value = minPrice;
                priceToSlider.value = maxPrice;

                priceFromSlider.dispatchEvent(new Event('change'));
                priceToSlider.dispatchEvent(new Event('change'));
            } else {
                priceFromSlider.value = this.minPrice;
                priceToSlider.value = this.maxPrice;
                priceFromSlider.dispatchEvent(new Event('change'));
                priceToSlider.dispatchEvent(new Event('change'));
            }
        } else {
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

            const minPrice: string = priceFromSlider.value;
            const maxPrice: string = priceToSlider.value;
            const minStock: string = stockFromSlider.value;
            const maxStock: string = stockToSlider.value;

            if (minPrice !== this.minPrice || maxPrice !== this.maxPrice) {
                this.queryParams.price = `${minPrice}_${maxPrice}`;
            }

            if (minStock !== this.minStock || maxStock !== this.maxStock) {
                this.queryParams.stock = `${minStock}_${maxStock}`;
            }

            this.setQueryParams(this.queryParams);
        }
    }

    private sortProducts(target: HTMLElement, sortType: string | undefined): void {
        this.queryParams.sort = sortType;
        this.setQueryParams(this.queryParams);

        if (sortType) {
            const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
            const sortProductDropdown = document.querySelector('#sortProductDropdown') as HTMLButtonElement;

            const arrayCards = Array.prototype.slice.call(productCards);

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
            <div class="nothing-found d-none">No products found.</div>
        </main>
    `,
});
