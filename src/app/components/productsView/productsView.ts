import { ComponentConfig } from '../../../types';
import { WFMComponent } from '../../../routes';
import productsViewList from './../../../assets/images/products-view-list.png';
import productsViewBlock from './../../../assets/images/products-view-block.png';

class ProductsView extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const productsView = new ProductsView({
    selector: 'products-view',
    innerComponents: null,
    getTemplate: () => `
                <div class="products-view__btn active" data-view="block">
                  <img class="products-view__image" src="${productsViewBlock}" alt="">
                </div>
                <div class="products-view__btn" data-view="list">
                  <img class="products-view__image" src="${productsViewList}" alt="">
                </div>     
    `,
});
