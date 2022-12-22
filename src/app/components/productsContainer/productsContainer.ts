import { WFMComponent } from '../../../routes';
import { ComponentConfig, Product } from '../../../types';
import './productsContainer.scss';
import { productsData } from '../../../data/productsData';

class ProductsContainer extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

let cardsTemplate = ``;

productsData.products.forEach((product: Product) => {
    cardsTemplate += `
            <div data-category="${product.category}" data-brand="${product.brand}" class="product col-lg-4 col-md-6 col-12">
                <div class="product__container">
                    <div class="product__title">
                     ${product.title}
                    </div>
                    <div class="product__image">
                        <img alt="" src="${product.thumbnail}">
                    </div>
                    <div class="product__description">
                        ${product.description}
                    </div>
                    <div class="product__buttons">
                        <button class="button">Add to cart</button>
                        <button class="button">Details</button>
                    </div>
                </div>
            </div>
            `;
});

export const productsContainer = new ProductsContainer({
    selector: 'products-container',
    innerComponents: null,
    template: `${cardsTemplate}`,
});
