import { productsData } from '../../../data/productsData';
import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';

import './homePage.scss';

class HomePage extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ConfigPage) {
        super(config);
    }
}

export const homePage = new HomePage({
    selector: 'home',
    template: `${productsData.products.forEach((product) => {
        const cardContainer = document.querySelector('#card-container') as HTMLElement;
        const div = document.createElement('div') as HTMLDivElement;
        div.className = 'prod col-lg-3 col-md-4 col-6';
        div.innerHTML = `
            <div class="prod__title">
            ${product.title}
            </div>
            <div class="prod__image">
                <img src="${product.thumbnail}">
            </div>
            <div class="prod__description">
            ${product.description}
            </div>
            <div class="prod__buttons">
                <button class="button">Add to cart</button>
                <button class="button">Details</button>
            </div>`
        cardContainer?.append(div);
        return cardContainer;
      })}`,
});
