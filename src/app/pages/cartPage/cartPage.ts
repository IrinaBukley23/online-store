import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

function getData() {
    const storage: string | null = localStorage.getItem ("productsInCart");
    if(!storage) return;
    const cartArr = JSON.parse(storage);
    return cartArr;
}
getData();
//console.log(getData());

export const cartPage = new CartPage({
    selector: 'cart',
    innerComponents: null,
    getTemplate() {
      return `
        <h1>Cart Page</h1>
    `}
});
