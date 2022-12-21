import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import { productsContainer } from '../../components/productsContainer/productsContainer';
import { filter } from '../../components/filter/filter';
import './homePage.scss';

class HomePage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const homePage = new HomePage({
    selector: 'home',
    innerComponents: [productsContainer, filter],
    template: `
        <filter class="filter"></filter>
        <products-container class="product__cards"></products-container>
    `,
});
