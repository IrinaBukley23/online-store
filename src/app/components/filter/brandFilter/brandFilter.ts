import { productsData } from '../../../../data/productsData';
import { WFMComponent } from '../../../../routes';
import { ComponentConfig, Product } from '../../../../types';

class BrandFilter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

const productCategories = new Set();
let brandFilterTemplate = ``;

productsData.products.forEach((product: Product) => {
    productCategories.add(product.brand);
});

productCategories.forEach((brand, index) => {
    brandFilterTemplate += `
        <div class="form-check">
            <input class="brand-checkbox form-check-input" type="checkbox" value="${brand}" id="brand-checkbox-${index}">
            <label class="form-check-label" for="brand-checkbox-${index}">
                ${brand}
            </label>
        </div>
    `;
});

export const brandFilter = new BrandFilter({
    selector: 'brand-filter',
    innerComponents: null,
    getTemplate() {
        return `
        <h5 class="brand-filter__title">Brands</h5>
        <div class="filter__block-options brand-filter__options">${brandFilterTemplate}</div>
      `}
});
