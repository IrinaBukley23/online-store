import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';

import './cartPage.scss';

class CartPage extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const cartPage = new CartPage({
  selector: 'notFound',
  template: `
      <section class="cart">
        <h2 class="cart__title">Cart page</h2>
        <a class="error__link" href="#">Back to main page</a>
      </section>
    `,
});
