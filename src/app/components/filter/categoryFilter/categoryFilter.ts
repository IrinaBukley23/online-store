import { WFMComponent } from '../../../../routes';
import { ComponentConfig, Product } from '../../../../types';
import { productsData } from '../../../../data/productsData';

class CategoryFilter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

const productCategories = new Set();
let categoryFilterTemplate = ``;

productsData.products.forEach((product: Product) => {
    productCategories.add(product.category);
});

productCategories.forEach((category, index) => {
    categoryFilterTemplate += `
        <div class="form-check">
            <input class="category-checkbox form-check-input" type="checkbox" value="${category}" id="category-checkbox-${index}">
            <label class="form-check-label" for="category-checkbox-${index}">
                ${category}
            </label>
        </div>
    `;
});

export const categoryFilter = new CategoryFilter({
    selector: 'category-filter',
    innerComponents: null,
    template: `
    <h5 class="category-filter__title">Categories</h5>
    <div class="filter__block-options category-filter__options">${categoryFilterTemplate}</div>
    `,
});
