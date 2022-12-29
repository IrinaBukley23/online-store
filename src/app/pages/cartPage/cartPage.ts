import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import img from '../../../../public/cart.png';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

// function getData() {
//     const storage: string | null = localStorage.getItem ("productsInCart");
//     if(!storage) return;
//     const cartArr = JSON.parse(storage);
//     return cartArr;
// }
// getData();
//console.log(getData());

export const cartPage = new CartPage({
    selector: 'cart',
    innerComponents: null,
    getTemplate() {
      return `
        <section class="cart">
            <div class="container">
                <div class="cart__products">
                    <div class="cart__title-block">
                        <h3 class="cart__summary-title">Products In Cart</h3>
                        <div class="cart__pagination-block">
                            <p>LIMIT: <input value="3" type="number"> </p>
                            <p>PAGE:  
                                <button> < </button> 
                                <span>1</span> 
                                <button> > </button>
                            </p>
                        </div>
                    </div>
                    <div class="cart__products-block"> 

                        <div class="cart__products-elem">
                            <p class="cart__products-num">1</p>
                            <div class="cart__products-img">
                                <img src=${img}> 
                            </div>
                            <div  class="cart__products-description">
                                <h3 class="cart__products-title">Samsung Universe 9</h3>
                                <p class="cart__products-descr"> Samsung's new variant which goes beyond Galaxy to the Universe</p>
                                <div class="cart__products-raiting">
                                    <p>Rating: <span>4.09</span> </p>
                                    <p>Discount: <span>15.46</span>% </p>
                                </div>
                            </div>
                            <div class="cart__products-sum">
                                <p>Stock: <span>36</span> </p>
                                <div class="cart__counter">
                                    <button> - </button> 
                                    <span>1</span> 
                                    <button> + </button>
                                </div>
                                <p>€<span>2,498.00</span></p>
                            </div>
                        </div>

                        <div class="cart__products-elem">
                            <p class="cart__products-num">1</p>
                            <div class="cart__products-img">
                                <img src=${img}> 
                            </div>
                            <div  class="cart__products-description">
                                <h3 class="cart__products-title">Samsung Universe 9</h3>
                                <p class="cart__products-descr"> Samsung's new variant which goes beyond Galaxy to the Universe</p>
                                <div class="cart__products-raiting">
                                    <p>Rating: <span>4.09</span> </p>
                                    <p>Discount: <span>15.46</span>% </p>
                                </div>
                            </div>
                            <div class="cart__products-sum">
                                <p>Stock: <span>36</span> </p>
                                <div class="cart__counter">
                                    <button> - </button> 
                                    <span>1</span> 
                                    <button> + </button>
                                </div>
                                <p>€<span>2,498.00</span></p>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="cart__summary">
                    <h3 class="cart__summary-title">Summary</h3>
                    <h4 class="cart__summary-subtitle">Products: <span></span> </h4>
                    <h4 class="cart__summary-subtitle">Total: <span></span> </h4>
                    <div class="cart__summary-promo">
                        <input type="text" placeholder="Enter promo code">
                        <label>Promo for test: 'RS', 'EPM'</label>
                    </div>
                    <button class="button">Buy now</button>
                </div>
            </div>
        </section>
    `}
});
