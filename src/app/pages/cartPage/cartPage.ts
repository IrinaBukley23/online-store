import { PromoCodes } from '../../../enum';
import { WFMComponent } from '../../../routes/index';
import { promocodesDescription } from '../../../routes/tools/utils';
import { CartItem, ComponentConfig } from '../../../types';
import { appRoutes } from '../../app.routes';

import './cartPage.scss';
import { ids } from 'webpack';

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

                if (target.value && target.value.toLowerCase() === PromoCodes.RS_PROMO_CODE) {
                    if(textElem) {
                        textElem.innerHTML = 'Rolling Scopes School - 10%';
                    }
                    if(addBtn.classList.contains('hidden')) addBtn.classList.remove('hidden');
                    document.querySelector('.cart-promo_block')?.classList.add('active');
                }
    
                if (target.value && target.value.toLowerCase() === PromoCodes.EPAM_PROMO_CODE) {
                    if(textElem) {
                        textElem.innerHTML = 'EPAM Systems - 10% ';
                    }
                    if(addBtn.classList.contains('hidden')) addBtn.classList.remove('hidden');
                    document.querySelector('.cart-promo_block')?.classList.add('active');
                }
            }
        };  

        if (target.classList.contains('cart__pagination-limit input')) {
            const limitValueEl = document.querySelector('.cart__pagination-limit input') as HTMLInputElement;
            if(limitValueEl) limitValueEl.value = target.value;
        }
    }

    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;

        // decrease product amount
        const decrCounterBtn = target.classList.contains('cart__counter-decr');
        if (decrCounterBtn) this.decrCounter(target);

        // increase product amount
        const incrCounterBtn = target.classList.contains('cart__counter-incr');
        if (incrCounterBtn) this.incrCounter(target);

        // add promo list
        const isAddPromoBtn = target.classList.contains('cart-promo_btn');
        if (isAddPromoBtn) this.renderPromoList();

        // clear input
        const isClearInputBtn = target.classList.contains('cart-clear');
        if (isClearInputBtn) {
            (document.querySelector('.cart-promo') as HTMLInputElement).value = '';
        }
    
        // apply new sum with promo codes
        const isDropBtn = target.classList.contains('cart-applied_btn');
        if (isDropBtn) this.applyPromo(target);  

        // to single page routing
        if (target.classList.contains('cart__products-img img') || target.classList.contains('cart__products-descr') || target.classList.contains('cart__products-title') || target.classList.contains('cart__products-raiting')) {
            this.singlePageRoute(target);
        }

        // pagination
        if(target.classList.contains('pagination__item')) {
            this.pagination(target);
        }

        // open popup
        const openPopupBtn = target.classList.contains('btn__popup');
        if(openPopupBtn) this.openPopup();
    }

    private pagination(elem: HTMLElement) {
        const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        let limitProdsOnPage  = (document.querySelector('.cart__pagination-limit select') as HTMLSelectElement)?.value;
        const currentPage = +elem.id - 1;
        const start = +limitProdsOnPage * +currentPage;
        const end = start + +limitProdsOnPage;
        const paginatedData = cartArr.slice(start, end);
        const productsContainer = document.querySelector('.cart__products-block');
        if(productsContainer) productsContainer.innerHTML = '';
        let index = start + 1;
        paginatedData && paginatedData.forEach(item => {
            let cartTemplate = document.createElement('div');
            cartTemplate.classList.add('cart__products-elem');
            cartTemplate.innerHTML = `
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
                </div>`;
            productsContainer?.append(cartTemplate);
        })

        const btnsBlock = document.querySelector('.pagination__list');
        if(btnsBlock) btnsBlock.innerHTML = '';
        let paginationBtns = ``;
        const pagesCount = Math.ceil(cartArr.length / +limitProdsOnPage);
        for (let i = 0; i < pagesCount; i++) {
            let paginationBtn = document.createElement('li');
            paginationBtn.classList.add('pagination__item');
            paginationBtn.setAttribute('id', `${i+1}`);
            paginationBtn.innerHTML = `${i+1}`;
            btnsBlock?.append(paginationBtn);
        }
    }

    private renderPromoCodes(arr: string[]) {
        document.querySelector('.cart-applied')?.classList.add('active');
        document.querySelector('.cart__summary-sum')?.classList.add('active');
        document.querySelector('.cart__summary-sum_promo')?.classList.add('active');

        const appliedPromoList = document.querySelector('.cart-applied_block');
        const li = document.createElement('li');
        li.classList.add('cart-applied_block-item');
        const addBtn = document.querySelector('.cart-promo_btn') as HTMLElement;
        if (arr.length === 0) {
            const promoBlock = <HTMLElement>document.querySelector('.cart-applied');
            promoBlock.classList.remove('active');
            const promoSum = <HTMLElement>document.querySelector('.cart__summary-sum_promo');
            const totalSum = <HTMLElement>document.querySelector('.cart__summary-sum');
            promoSum.classList.remove('active');
            totalSum.classList.remove('active');
        }
        const uniqArr = [... new Set(arr)];
        uniqArr.forEach((item) => {
            document.querySelector('.cart-promo_block')?.classList.add('active');
            li.setAttribute('data-id', item)
            if(item === PromoCodes.RS_PROMO_CODE) {
                li.innerHTML = `<p class="cart-applied_text">${ promocodesDescription[PromoCodes.RS_PROMO_CODE]}</p>
                <button class="cart-applied_btn">drop</button>
            `;}
            if(item === PromoCodes.EPAM_PROMO_CODE) {
                li.innerHTML = `<p class="cart-applied_text">${ promocodesDescription[PromoCodes.EPAM_PROMO_CODE]}</p>
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

    private incrCounter(elem: HTMLElement) {
        const curElem = <HTMLElement> elem.previousSibling?.previousSibling;
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

    private decrCounter(elem: HTMLElement) {
        const curElem = <HTMLElement> elem.nextSibling?.nextSibling
        let curNum = Number(curElem?.textContent);

        if(curNum >= 1) {
            curNum -= 1;
            localStorage.setItem('totalCounter', String(curNum))
        } else {
            this.dropProduct();
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

    private dropProduct() {
        let cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        const productsContainer = document.querySelector('.cart__products-block');
        if(productsContainer) productsContainer.innerHTML = '';
        
        cartArr.forEach(prod => {
            if(prod.counter === 0) {
                const filteredArr = cartArr.filter((product: CartItem) => product.counter !== 0);
                let index = 1;
                localStorage.setItem('cart', JSON.stringify(filteredArr));
                cartArr = JSON.parse(localStorage.getItem('cart') as string);
                cartArr && cartArr.forEach((item: CartItem) => {
                    let cartTemplate = document.createElement('div');
                    cartTemplate.classList.add('cart__products-elem');
                    cartTemplate.innerHTML = `
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
                        </div>`;
                    productsContainer?.append(cartTemplate);
                })
                if(!cartArr || cartArr.length === 0) {
                    if(productsContainer) productsContainer.innerHTML = `<h3>Cart is empty</h3>`;
                }
            }
        })
    }

    private singlePageRoute(elem: HTMLElement) {
        const id = (((elem as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement)?.getAttribute('id');
        (((elem as HTMLElement).parentNode as HTMLElement).parentNode as HTMLElement).setAttribute('href', `#single/${id}`);
        appRoutes[1].path = `single/${id}`;
    }

    private applyPromo(elem: HTMLElement) {
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

            const i = this.promoArr.indexOf(((elem.parentNode as HTMLElement)?.dataset.id) as string);
            this.promoArr.splice(i, 1);
            const promoBlock = document.querySelector('.cart-applied');
            promoBlock?.classList.add('active');
            const promocodesList= document.querySelector('.cart-applied_block')
            if(promocodesList) (promocodesList as HTMLElement).innerHTML = '';
            this.renderPromoCodes(this.promoArr);
    }

    private renderPromoList() {
        const promoCode = (document.querySelector('.cart-promo') as HTMLInputElement).value;
        if (promoCode.toLowerCase() === PromoCodes.RS_PROMO_CODE) {
            this.promoArr.push('rs')
        } 
        if (promoCode.toLowerCase() === PromoCodes.EPAM_PROMO_CODE) {
            this.promoArr.push('epm')
        } 
        this.renderPromoCodes(this.promoArr);
    }

    private openPopup() {
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.add('active');
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
            return `<h3>Cart is empty</h3>`;
        }

        let paginationBtns = ``;
        const pagesCount = Math.ceil(cartArr.length / 3);
        for (let i = 0; i < pagesCount; i++) {
            paginationBtns += `<li id=${i+1} class="pagination__item">${i+1}</li>`
        }
        const start = 0;
        const end = 3;
        const paginatedData = cartArr.slice(start, end);

        paginatedData && paginatedData.forEach((item: CartItem) => {
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
                        <p class="cart__pagination-limit">LIMIT: 
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3" selected>3</option>
                            </select>
                        </p>
                        <p class="pagination">PAGE:  
                            <ul class="pagination__list">${paginationBtns}</ul>
                        </p>
                    </div>
                </div>
                <div class="cart__products-block">${cartTemplate}</div>
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
                <button class="button btn__popup">Buy now</button>
            </div>
        </section>`
    }
});
