import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';
import mainLogo from '../../../../public/logo.png';
import cart from '../../../../public/cart.png';

class Header extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const header = new Header({
    selector: 'app-header',
    innerComponents: null,
    getTemplate() {
      const headerTotalCounter = (localStorage.getItem('totalCounter')) ? localStorage.getItem('totalCounter') : '0';
      const headerTotalSum = (localStorage.getItem('totalSum')) ? localStorage.getItem('totalSum') : '0';

      return `
      <div class="wrapper"> 
      <a class="header__logo" href="#">
        <img src="${mainLogo}" alt="logo">
      </a>
      <div class="header__sum">
        <p>Cart total: €<span>${headerTotalSum}</span></p> 
      </div>
      <a class="header__cart" href="#cart">
        <img src="${cart}" alt="cart">
        <span class="header__count">${headerTotalCounter}</span>
      </a>
    </div>
    `}
});
