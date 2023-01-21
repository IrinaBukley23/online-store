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
      const totalCounterValue =  localStorage.getItem('totalCounter');
      const headerTotalCounter = totalCounterValue ? totalCounterValue : '0';
      const totalSumValue = localStorage.getItem('totalSum');
      const headerTotalSum = totalSumValue ? totalSumValue : '0';

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
