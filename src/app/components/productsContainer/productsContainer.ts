import { WFMComponent } from '../../../routes';
import { ComponentConfig, Product } from '../../../types';
import { productsData } from '../../../data/productsData';
import { appRoutes } from '../../app.routes';

class ProductsContainer extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    clickSelector = '.btn__details';
    handleClick = (event: Event): void => {
        const target = event.target;
        if (!target) return;
        const id = (target as HTMLElement).getAttribute('id');
        (target as HTMLElement).setAttribute('href', `#single/${id}`);
        appRoutes[1].path = `single/${id}`;
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
                        <a id=${product.id} class="button btn__details" href="#single/1">Details</a>
                    </div>
                </div>
            </div>
        `;
});

export const productsContainer = new ProductsContainer({
    selector: 'products-container',
    innerComponents: null,
    getTemplate() {
        return `
        ${cardsTemplate}
      `}
});
