import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import { productsContainer } from '../../components/productsContainer/productsContainer';
import { filter } from '../../components/filter/filter';
import './homePage.scss';

class HomePage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    events() {
        return {
            'change .category-checkbox': 'handleCategoryCheckbox',
            'change .brand-checkbox': 'handleBrandCheckbox',
        };
    }

    handleCategoryCheckbox() {
        // const targetEl = target as Element;
        this.showCheckedCategories();
    }

    handleBrandCheckbox({ target }: Event) {
        // const targetEl = target as Element;

        // const labelEl = targetEl.nextElementSibling;
    }

    showCheckedCategories() {
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
}

export const homePage = new HomePage({
    selector: 'home',
    innerComponents: [productsContainer, filter],
    template: `
        <filter class="filter"></filter>
        <products-container class="product__cards"></products-container>
    `,
});
