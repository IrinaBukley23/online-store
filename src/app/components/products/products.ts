import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import { productsData } from '../../../data/productsData';
import './products.scss';

class Products extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ConfigPage) {
        super(config);
    }
}

let cardsTemplate = ``;

productsData.products.forEach((product) => {
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
