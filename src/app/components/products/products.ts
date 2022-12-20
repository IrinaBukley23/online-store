import { WFMComponent } from '../../../routes';
import { ConfigPage, Product } from '../../../types';
import './products.scss';

class Products extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ConfigPage) {
        super(config);
    }
}

let productsData;

fetch('http://example.com/movies.json')
    .then((response) => response.json())
    .then((data) => {
        productsData = data.products;
    });

let cardsTemplate = ``;

productsData.forEach((product: Product) => {
    cardsTemplate += `
          <div class="card col-3">
            <div class="card__title">
              ${product.title}
            </div>
            <div class="card__image">
              <img src="${product.thumbnail}">
            </div>
            <div class="card__description">
              ${product.description}
            </div>
            <div class="card__buttons">
              <div class="button">Add to cart</div>
              <div class="button">Details</div>
            </div>
          </div>   
  `;
});

export const products = new Products({
    selector: 'products',
    template: `
        ${cardsTemplate}
      `,
});
