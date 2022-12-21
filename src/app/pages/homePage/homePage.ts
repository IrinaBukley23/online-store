import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import './homePage.scss';
import { productsContainer } from '../../components/products/productsContainer';

class HomePage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const homePage = new HomePage({
    selector: 'home',
    template: `
        <products-container class="product__cards"></products-container>
    `,
    innerComponents: [productsContainer],
});
