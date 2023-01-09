import { WFMComponent } from '../../../routes';
import { CartItem, ComponentConfig, Product } from '../../../types';
import { productsData } from '../../../data/productsData';
import { appRoutes } from '../../app.routes';

class ProductsContainer extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }

    cartProducts: CartItem[] = [];
    public handleClick(event: Event): void {
        const target = event.target as HTMLElement;

        const isShowDetails = target.classList.contains('btn__details');
        if (isShowDetails) this.showDetails(target);

        if(target.classList.contains('product__image-link')) {
            const id = ((target as HTMLElement).parentNode as HTMLElement)?.getAttribute('id');
            ((target as HTMLElement).parentNode as HTMLElement).setAttribute('href', `#single/${id}`);
            appRoutes[1].path = `single/${id}`;
        }

        const addToCartBtn = target.classList.contains('btn__to-cart');
        if(addToCartBtn) this.addToCart(target);

        const dropFromCart = target.classList.contains('btn__drop');
        if(dropFromCart) this.dropProduct(target);
    }

    private showDetails(elem: HTMLElement) {
        const id = (elem).getAttribute('id');
        (elem).setAttribute('href', `#single/${id}`);
        appRoutes[1].path = `single/${id}`;
    }

    private dropProduct(elem: HTMLElement) {
        let cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        const productsContainer = document.querySelector('.cart__products-block');
        const addBtnContainer = elem.parentElement;
        if(addBtnContainer) addBtnContainer.innerHTML = `<button id=${elem.id} class="single__info-price_btn btn__to-cart">add to cart</button>`;
        if(productsContainer) productsContainer.innerHTML = '';
        cartArr.forEach(prod => {
            if(prod.product.id === +elem.id) {
                const filteredArr = cartArr.filter((product: CartItem) => product.product.id !== +elem.id);
                localStorage.setItem('cart', JSON.stringify(filteredArr));
                cartArr = JSON.parse(localStorage.getItem('cart') as string);
            }
        })
        const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
        if(headerTotalCounterEl) {
        headerTotalCounterEl.innerHTML = `${Number(headerTotalCounterEl.innerHTML) - 1}`;
        }
        const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
        const id = (elem as HTMLElement)?.getAttribute('id');
            const [product] = productsData.products.filter((product: Product) => product.id === Number(id));
        if(headerTotalSumEl) {
        headerTotalSumEl.innerHTML = `${Number(headerTotalSumEl.innerHTML) - Number(product.price)}`;
        }
        localStorage.setItem('totalCounter', String(Number(headerTotalSumEl.innerHTML) - Number(product.price)));
        localStorage.setItem('totalSum', String(Number(headerTotalCounterEl.innerHTML) - 1));
    }

    private addToCart(elem: HTMLElement) {
        const id = elem.getAttribute('id');
        if (!id) return;
        const [product] = productsData.products.filter((product: Product) => product.id === Number(id));
        const addBtnContainer = elem.parentElement;
        if(addBtnContainer) addBtnContainer.innerHTML = `<button id=${elem.id} class="single__info-price_btn btn__drop">drop from cart</button>`;
        this.cartProducts.push({
            'product': product,
            'counter': 1, 
            'flag': true,
        });
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));

        const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        let cartTotalCounter = 0;
        let cartTotalSum = 0;
        cartArr.forEach((item) => {
            cartTotalCounter += item.counter;
            cartTotalSum += item.product.price * item.counter;
            localStorage.setItem('totalSum', String(cartTotalSum));
            localStorage.setItem('totalCounter', String(cartTotalCounter));
        });
        const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
        if(headerTotalCounterEl) {
            headerTotalCounterEl.innerHTML = `${cartTotalCounter}`;
        }
        const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
        if(headerTotalSumEl) {
            headerTotalSumEl.innerHTML = `${cartTotalSum}`;
        }
    }
}

export const productsContainer = new ProductsContainer({
    selector: 'products-container',
    innerComponents: null,
    getTemplate() {
        const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
        let btnToCartText = 'add to cart';
        let cardsTemplate = ``;

        productsData.products.forEach((product: Product) => {
            cartArr?.forEach(prod => {
                if(prod.product.id === product.id){
                    btnToCartText = 'drop from cart';
                } else {
                    btnToCartText = 'add to cart';
                }
            })
            cardsTemplate += `
                <div data-id="${product.id}" data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}" data-stock="${product.stock}"  data-discount="${product.discountPercentage}" class="product col-lg-4 col-md-6 col-12">
                <div class="product__container">
                    <div class="product__title">
                     ${product.title}
                    </div>
                    <div class="product__image">
                        <a id=${product.id} href="#single/1">
                            <img alt="photo" class="product__image-link"  src="${product.thumbnail}">
                        </a>
                    </div>
                    <div class="product__description">
                        ${product.description}
                    </div>
                    <div class="product__stock">
                        In stock: ${product.stock}
                    </div>
                    <div class="product__price">
                        € ${product.price}
                    </div>
                    <div class="product__discount">
                        Discount: ${product.discountPercentage}%
                    </div>
                    <div class="product__rating">
                        Rating: ${product.rating}/5
                    </div>
                    <div class="product__buttons">
                        <div class="add__btn-container">
                            <button id=${product.id} class="button btn__to-cart">${btnToCartText}</button>
                        </div>
                        <a id=${product.id} class="button btn__details" href="#single/1">Details</a>
                    </div>
                </div>
            </div>
            `;
        });

        return `
    ${cardsTemplate}
    `;
    },
});
