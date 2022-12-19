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

const cardTemplate = `
  <div class="card__title">
  </div>
  <div class="card__image">
  </div>
  <div class="card__description">
  </div>
  <div class="card__buttons">
    <div class="button">Add to cart</div>
    <div class="button">Details</div>
  </div>
`;

export const products = new Products({
    selector: 'products',
    template: `
      ${cardTemplate}
    `,
});
