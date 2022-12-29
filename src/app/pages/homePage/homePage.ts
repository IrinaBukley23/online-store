import { WFMComponent } from '../../../routes/index';
import { ComponentConfig, Product } from '../../../types';
import { productsContainer } from '../../components/productsContainer/productsContainer';
import { filter } from '../../components/filter/filter';
import { dualSliderStock } from '../../components/filter/dualSlider/dualSliderStock';
import { productsData } from '../../../data/productsData';
import './homePage.scss';

class HomePage extends WFMComponent {
    private productsData: Product[];
    private stockFromSlider: HTMLInputElement;
    private stockToSlider: HTMLInputElement;


    constructor(config: ComponentConfig) {
        super(config);
        this.productsData = productsData.products;
        this.stockFromSlider = document.querySelector(`dual-slider-stock #fromSlider`) as HTMLInputElement;
        this.stockToSlider = document.querySelector(`dual-slider-stock #toSlider`) as HTMLInputElement;
    }

    public handleInputChange(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('category-checkbox')) {
            this.handleCategoryCheckbox();
            this.changeActiveBrandCheckboxes();
        }

        if (target.classList.contains('brand-checkbox')) {
            this.handleBrandCheckbox();
            this.changeActiveCategoryCheckboxes();
        }
    }

    private handleCategoryCheckbox(): void {
        this.showCheckedCards();
    }

    private handleBrandCheckbox(): void {
        this.showCheckedCards();
    }

    private showCheckedCards(): void {
        const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
        const checkedCategoryInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const checkedBrandInputs = document.querySelectorAll('.brand-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];
        const chosenBrands: (string | undefined)[] = [];

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
        });
    }

    private changeActiveBrandCheckboxes(): void {
        const brandCheckboxes = document.querySelectorAll('.brand-checkbox');

        const checkedCategoryInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];

        if (!checkedCategoryInputs.length) {
            brandCheckboxes.forEach(checkbox => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.disabled = false;
            })

            return
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
        })
    }

    private changeActiveCategoryCheckboxes(): void {
        const categoryCheckboxes = document.querySelectorAll('.category-checkbox');

        const checkedBrandInputs = document.querySelectorAll('.brand-filter .form-check-input:checked');
        console.log(checkedBrandInputs);
        const chosenBrands: (string | undefined)[] = [];

        if (!checkedBrandInputs.length) {
            categoryCheckboxes.forEach(checkbox => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.disabled = false;
            })

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
        })
    }
}

export const homePage = new HomePage({
    selector: 'home',
    innerComponents: [productsContainer, filter],
    getTemplate: () => `
        <filter class="filter"></filter>
        <products-container class="product__cards"></products-container>
    `,
});
