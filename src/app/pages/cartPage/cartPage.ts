import { WFMComponent } from '../../../routes/index';
import { CartItem, ComponentConfig } from '../../../types';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    public handleInput(event: Event): void {
        const target = event.target as HTMLInputElement;

        if (target.classList.contains('cart-promo')) {
            const textElem = document.querySelector('.cart-promo_text') as HTMLElement; 

            if (target.value.toLowerCase() === "rs") {
                if(textElem) {
                    textElem.innerHTML = 'Rolling Scopes School - 10%';
                }
                document.querySelector('.cart-promo_block')?.classList.add('active');
            }

            if (target.value.toLowerCase() === "epm") {
                if(textElem) {
                    textElem.innerHTML = 'EPAM Systems - 10% ';
                }
                document.querySelector('.cart-promo_block')?.classList.add('active');
            }
        }
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.classList.contains('cart__counter-decr')) {
            const curElem = <HTMLElement> target.nextSibling?.nextSibling
            let curNum = Number(curElem?.textContent);

            if(curNum < 1) {
                curNum = 0;
            } else {
                curNum -= 1;
                localStorage.setItem('totalCounter', String(curNum))
            }
            (curElem as HTMLElement).innerHTML = String(curNum);
            const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
            let cartTotalSum = 0;
            let cartTotalCounter = 0;
            cartArr.forEach(item => {
                if(Number(curElem.id) === Number(item.product.id)) {
                    item.counter = curNum;
                }
                cartTotalSum += (item.product.price * item.counter);
                cartTotalCounter += item.counter;
            })
            localStorage.setItem('cart', JSON.stringify(cartArr));
            localStorage.setItem('totalSum', String(cartTotalSum));
            localStorage.setItem('totalCounter', String(cartTotalCounter))
        }

        if (target.classList.contains('cart__counter-incr')) {
            const curElem = <HTMLElement> target.previousSibling?.previousSibling;
            console.log(curElem.id)
            let curNum = Number(curElem?.textContent);
            curNum += 1;
            (curElem as HTMLElement).innerHTML = String(curNum);

            const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
            let cartTotalSum = 0;
            let cartTotalCounter = 0;
            cartArr.forEach(item => {
                if(Number(curElem.id) === Number(item.product.id)) {
                    item.counter = curNum;
                }
                cartTotalSum += (item.product.price * item.counter);
                cartTotalCounter += item.counter;
            })
            localStorage.setItem('cart', JSON.stringify(cartArr));
            localStorage.setItem('totalSum', String(cartTotalSum));
            localStorage.setItem('totalCounter', String(cartTotalCounter))
        }

        if (target.classList.contains('cart-promo_btn')) {

            document.querySelector('.cart__summary-sum')?.classList.add('active');
            document.querySelector('.cart__summary-sum_promo')?.classList.add('active');
            document.querySelector('.cart-applied')?.classList.add('active');

            const appliedPromoList = document.querySelector('.cart-applied_block');
            const li = document.createElement('li');
            li.classList.add('cart-applied_block-item');

            const promoCode = (document.querySelector('.cart-promo') as HTMLInputElement).value;
            const promoApplied = document.querySelectorAll('.cart-applied_block-item');
            if (promoApplied.length >= 1) {
                const addBtn = document.querySelector('.cart-promo_btn') as HTMLElement;
                if(addBtn) (addBtn).style.display = "none";
            }

            if (promoCode.toLowerCase() === "rs") {
                
                document.querySelector('.cart-promo_block')?.classList.add('active');
                li.setAttribute('id', 'rs');
                li.innerHTML = `<p class="cart-applied_text">Rolling Scopes School - 10%</p>
                <button class="cart-applied_btn">drop</button>
                `;
                
                if(promoApplied.length < 2){
                    appliedPromoList?.append(li);
                    promoApplied.forEach(item => {
                        console.log(item.id)
                        if(item.id !== 'rs') {
                            appliedPromoList?.append(li);
                        } else {
                            return;
                        }
                    }
                )}
            }

            if (promoCode.toLowerCase() === "epm") {
                
                document.querySelector('.cart-promo_block')?.classList.add('active');
                li.setAttribute('id', 'epm');
                li.innerHTML = `<p class="cart-applied_text">EPAM Systems - 10%</p>
                <button class="cart-applied_btn">drop</button>
                `;
                
                if(promoApplied.length < 2){
                appliedPromoList?.append(li);
                promoApplied.forEach(item => {
                    console.log(item.id)
                    if(item.id !== 'epm') {
                        appliedPromoList?.append(li);
                    } else {
                        return;
                    }
                })}
            }
        }
    }
}

export const cartPage = new CartPage({
    selector: 'cart',
    innerComponents: null,
    getTemplate() {
        let cartTemplate = ``;
        let index = 1;
        const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        const cartTotalCounter = (localStorage.getItem('totalCounter')) ? localStorage.getItem('totalCounter') : '0';
        const cartTotalSum = (localStorage.getItem('totalSum')) ? localStorage.getItem('totalSum') : '0';
        if(!cartArr || cartArr.length === 0) {
            return `<h3>Cart is empty</h3>`
        }

        cartArr && cartArr.forEach((item: CartItem) => {
            cartTemplate += `
            <div class="cart__products-elem">
                <p class="cart__products-num">${index++}</p>
                <div class="cart__products-img">
                    <img src=${item.product.images[0]}> 
                </div>
                <div  class="cart__products-description">
                    <h3 class="cart__products-title">${item.product.title}</h3>
                    <p class="cart__products-descr"> ${item.product.description}</p>
                    <div class="cart__products-raiting">
                        <p>Rating: <span>${item.product.rating}</span> </p>
                        <p>Discount: <span>${item.product.discountPercentage}</span>% </p>
                    </div>
                </div>
                <div class="cart__products-sum">
                    <p>Stock: <span>${item.product.stock}</span> </p>
                    <div class="cart__counter">
                        <button class="cart__counter-decr">-</button> 
                        <span id=${item.product.id} class="cart__counter-result">${item.counter}</span> 
                        <button class="cart__counter-incr">+</button>
                    </div>
                    <p>€<span>${item.product.price}</span></p>
                </div>
            </div>`;
        });

        return `<section class="cart">
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
                ${cartTemplate}
                </div>
            </div>
            <div class="cart__summary">
                <h3 class="cart__summary-title">Summary</h3>
                <h4 class="cart__summary-subtitle">Products: <span>${cartTotalCounter}</span> </h4>
                <h4 class="cart__summary-sum">Total: €<span>${cartTotalSum}</span> </h4>
                <h4 class="cart__summary-sum_promo">Total: €<span>0</span> </h4>
                <div class="cart-applied">
                    <h5 class="cart-applied_title">Applied codes</h5>
                    <ul class="cart-applied_block"></ul>
                </div>
                <div class="cart__summary-promo">
                    <input class="cart-promo" type="text" placeholder="Enter promo code">
                    <div class="cart-promo_block">
                        <p class="cart-promo_text">Rolling Scopes School - 10%</p>
                        <button class="cart-promo_btn">add</button>
                    </div>
                    <label>Promo for test: 'RS', 'EPM'</label>
                </div>
                <button class="button">Buy now</button>
            </div>
        </section>`
    }
});
