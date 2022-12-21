import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const cartPage = new CartPage({
    selector: 'notFound',
    innerComponents: null,
    template: `
      <section class="cart">
        <h2 class="cart__title">Cart page</h2>
        <a class="error__link" href="#">Back to main page</a>
      </section>
    `,
});
