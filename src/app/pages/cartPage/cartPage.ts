import { WFMComponent } from '../../../routes/index';
import { CartItem, ComponentConfig } from '../../../types';
import { appRoutes } from '../../app.routes';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
    promoArr: string[] = [];
    newArr: CartItem[] = [];
    public handleInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        const addBtn = document.querySelector('.cart-promo_btn') as HTMLElement;

        if(this.promoArr.length > 1) {
            addBtn.classList.add('hidden');
        } else {
            if (target.classList.contains('cart-promo')) {
                const textElem = document.querySelector('.cart-promo_text') as HTMLElement; 

                if (target.value && target.value.toLowerCase() === "rs") {
                    if(textElem) {
                        textElem.innerHTML = 'Rolling Scopes School - 10%';
                    }
                    if(addBtn.classList.contains('hidden')) addBtn.classList.remove('hidden');
                    document.querySelector('.cart-promo_block')?.classList.add('active');
                }
    
                if (target.value && target.value.toLowerCase() === "epm") {
                    if(textElem) {
                        textElem.innerHTML = 'EPAM Systems - 10% ';
                    }
                    if(addBtn.classList.contains('hidden')) addBtn.classList.remove('hidden');
                    document.querySelector('.cart-promo_block')?.classList.add('active');
                }
            }
        };
        
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;

        // decrease product amount
        if (target.classList.contains('cart__counter-decr')) {
            const curElem = <HTMLElement> target.nextSibling?.nextSibling;
            const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
            let curNum = Number(curElem?.textContent);

            if(curNum < 1) {
                curNum = 0;
                cartArr.filter(elem => elem.counter !== curNum);
                // как обновить чтобы массив добавленных продуктов перерисовывался динамически ???
            } else {
                curNum -= 1;
                localStorage.setItem('totalCounter', String(curNum))
            }
            (curElem as HTMLElement).innerHTML = String(curNum);
            
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
            localStorage.setItem('totalCounter', String(cartTotalCounter));

            const cartTotalCounterEl = document.querySelector('.cart__summary-subtitle span') as HTMLElement;
            const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
            if(cartTotalCounterEl) {
                cartTotalCounterEl.innerHTML = `${cartTotalCounter}`;
                headerTotalCounterEl.innerHTML = `${cartTotalCounter}`;
            }

            const cartTotalSumEl = document.querySelector('.cart__summary-sum span') as HTMLElement;
            const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
            if(cartTotalSumEl) {
                cartTotalSumEl.innerHTML = `${cartTotalSum}`;
                headerTotalSumEl.innerHTML = `${cartTotalSum}`;
            }
        }

        // increase product amount
        if (target.classList.contains('cart__counter-incr')) {
            const curElem = <HTMLElement> target.previousSibling?.previousSibling;
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

            const cartTotalCounterEl = document.querySelector('.cart__summary-subtitle span') as HTMLElement;
            const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
            if(cartTotalCounterEl) {
                cartTotalCounterEl.innerHTML = `${cartTotalCounter}`;
                headerTotalCounterEl.innerHTML = `${cartTotalCounter}`;
            }

            const cartTotalSumEl = document.querySelector('.cart__summary-sum span') as HTMLElement;
            const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
            if(cartTotalSumEl) {
                cartTotalSumEl.innerHTML = `${cartTotalSum}`;
                headerTotalSumEl.innerHTML = `${cartTotalSum}`;
            }
        }

        // add promo list
        if (target.classList.contains('cart-promo_btn')) {
            const promoCode = (document.querySelector('.cart-promo') as HTMLInputElement).value;
            if (promoCode.toLowerCase() === "rs") {
                this.promoArr.push('rs')
            } 
            if (promoCode.toLowerCase() === "epm") {
                this.promoArr.push('epm')
            } 
            this.renderPromoCodes(this.promoArr);
        }

        // clear promo input
        if (target.classList.contains('cart-clear')) {
            (document.querySelector('.cart-promo') as HTMLInputElement).value = '';
        }
    
        // apply new sum with promo codes
        if(target.classList.contains('cart-applied_btn')) {
                        
            const promoContainer = <HTMLElement> document.querySelector('.cart__summary-sum_promo span');
            const promoSum1 = (Number(localStorage.getItem('totalSum')) * 0.9).toFixed(2);
            const promoSum2 = (Number(localStorage.getItem('totalSum')) * 0.8).toFixed(2);
            if(this.promoArr.length === 0) {
                document.querySelector('.cart__summary-sum_promo')?.classList.remove('active');
            }
            if(this.promoArr.length === 1) {
                promoContainer.innerHTML = String(promoSum1);
            }
            if(this.promoArr.length === 2) {
                promoContainer.innerHTML = String(promoSum2);
            }

            const i = this.promoArr.indexOf(((target.parentNode as HTMLElement)?.dataset.id) as string);
            this.promoArr.splice(i, 1);
            const promoBlock = document.querySelector('.cart-applied');
            promoBlock?.classList.add('active');
            if(promoBlock) (promoBlock as HTMLElement).innerHTML = '';
            this.renderPromoCodes(this.promoArr);
        }

        // to single page routing
        if (target.classList.contains('cart__products-img img') || target.classList.contains('cart__products-descr') || target.classList.contains('cart__products-title') || target.classList.contains('cart__products-raiting')) {
            const id = (((target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement)?.getAttribute('id');
            (((target as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement).setAttribute('href', `#single/${id}`);
            appRoutes[1].path = `single/${id}`;
        }
    }

    renderPromoCodes(arr: string[]) {
        document.querySelector('.cart-applied')?.classList.add('active');
        document.querySelector('.cart__summary-sum')?.classList.add('active');
        document.querySelector('.cart__summary-sum_promo')?.classList.add('active');

        const appliedPromoList = document.querySelector('.cart-applied_block');
        const li = document.createElement('li');
        li.classList.add('cart-applied_block-item');
        const addBtn = document.querySelector('.cart-promo_btn') as HTMLElement;
    
        const uniqArr = [... new Set(arr)] 
        console.log(uniqArr)
        uniqArr.forEach((item) => {
            document.querySelector('.cart-promo_block')?.classList.add('active');
            li.setAttribute('data-id', item)
            if(item === 'rs') {
                li.innerHTML = `<p class="cart-applied_text">Rolling Scopes School - 10%</p>
                <button class="cart-applied_btn">drop</button>
            `;}
            if(item === 'epm') {
                li.innerHTML = `<p class="cart-applied_text">EPAM Systems - 10%</p>
            <button class="cart-applied_btn">drop</button>
            `;}
            appliedPromoList?.append(li);
            addBtn.classList.add('hidden');
        })

        const promoContainer = <HTMLElement> document.querySelector('.cart__summary-sum_promo span');
        const appliedPromoItems = document.querySelectorAll('.cart-applied_block-item');
        const promoSum1 = (Number(localStorage.getItem('totalSum')) * 0.9).toFixed(2);
        const promoSum2 = (Number(localStorage.getItem('totalSum')) * 0.8).toFixed(2);
        if(appliedPromoItems.length === 1) {
            promoContainer.innerHTML = String(promoSum1);
        }
        if(appliedPromoItems.length === 2) {
            promoContainer.innerHTML = String(promoSum2);
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
        console.log(cartArr)
        if(!cartArr || cartArr.length === 0) {
            return `<h3>Cart is empty</h3>`;
        }

        cartArr && cartArr.forEach((item: CartItem) => {
            cartTemplate += `
            <div class="cart__products-elem">
                <p class="cart__products-num">${index++}</p>
                <a class="cart__products-link" id=${item.product.id} href="#single/1">
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
                </a>
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
                    <span class="cart-clear">×</span>
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
