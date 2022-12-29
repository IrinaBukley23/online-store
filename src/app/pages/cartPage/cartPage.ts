import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const cartPage = new CartPage({
    selector: 'cart',
    innerComponents: null,
    getTemplate() {
      return `
        <h1>Cart Page</h1>
    `}
});
