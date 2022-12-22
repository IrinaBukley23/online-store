import { WFMComponent } from '../../../routes';
import { ComponentConfig, Product } from '../../../types';
import './productsContainer.scss';
import { productsData } from '../../../data/productsData';

class ProductsContainer extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    events() {
        return {
            'click .btn__details': 'getId'
        }
    }

    getId({target}: MouseEvent) {
        console.log(target);
        // if(!target) return;
        // target.setAttribute('href', `#single/${target.id}`)
    }
}

let cardsTemplate = ``;

productsData.products.forEach((product: Product) => {
    cardsTemplate += `
            <div class="product col-lg-3 col-md-4 col-6">
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
                        <a id=${product.id} class="button btn__details" href="#single">Details</a>
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