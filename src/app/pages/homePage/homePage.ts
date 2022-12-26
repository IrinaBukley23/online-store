import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import { productsContainer } from '../../components/productsContainer/productsContainer';
import { filter } from '../../components/filter/filter';
import { productsData } from '../../../data/productsData';
import './homePage.scss';

class HomePage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    public handleInputChange(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('category-checkbox')) {
            console.log('target - category');

            this.handleCategoryCheckbox(event);
            this.changeActiveBrandCheckboxes();
        }

        if (target.classList.contains('brand-checkbox')) {
            console.log('target - brand');
            this.handleBrandCheckbox(event);
        }
    }

    private handleCategoryCheckbox(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.showCheckedCategories();
    }

    private handleBrandCheckbox(event: Event): void {
        const target = event.target as HTMLInputElement;
        // const labelEl = targetEl.nextElementSibling;
    }

    private showCheckedCategories(): void {
        const productCards = document.querySelectorAll('.product') as NodeListOf<HTMLElement>;
        const checkedInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];

        checkedInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenCategories.push(labelText);
            }
        });

        productCards.forEach((card) => {
            card.classList.remove('d-none');

            if (chosenCategories.length) {
                if (!chosenCategories.includes(card.dataset.category)) {
                    card.classList.add('d-none');
                }
            }
        });
    }

    private changeActiveBrandCheckboxes(): void {
        const brandCheckboxes = document.querySelectorAll('.brand-checkbox');

        const checkedInputs = document.querySelectorAll('.category-filter .form-check-input:checked');
        const chosenCategories: (string | undefined)[] = [];

        checkedInputs.forEach((input) => {
            if (input.nextElementSibling) {
                const labelText = input.nextElementSibling.textContent?.trim();
                chosenCategories.push(labelText);
            }
        });

        brandCheckboxes.forEach((checkbox) => {
            if (checkbox.nextElementSibling)
        })
    }
}

export const homePage = new HomePage({
    selector: 'home',
    innerComponents: [productsContainer, filter],
    template: `
        <filter class="filter"></filter>
        <products-container class="product__cards"></products-container>
    `,
});
