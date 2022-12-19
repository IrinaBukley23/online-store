import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import mainLogo from '../../../../public/logo.png';
import cart from '../../../../public/cart.png';

import './header.scss';

class Header extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const header = new Header({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="wrapper"> 
        <a class="header__logo" href="#">
          <img src="${mainLogo}" alt="logo">
        </a>
        <div class="header__sum">
          <p>Cart total: € <span>0.00</span></p> 
        </div>
        <a class="header__cart" href="#cart">
          <img src="${cart}" alt="cart">
          <span class="header__count">0</span>
        </a>
      </div>
    <header>
  `,
});
