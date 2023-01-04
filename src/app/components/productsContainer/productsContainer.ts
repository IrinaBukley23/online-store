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

        if (target.classList.contains('btn__details')) {
            const id = (target as HTMLElement).getAttribute('id');
            (target as HTMLElement).setAttribute('href', `#single/${id}`);
            appRoutes[1].path = `single/${id}`;
        }

        if (target.classList.contains('btn__to-cart')) {
            const id = (target as HTMLElement).getAttribute('id');

            if (!id) return;
            const [product] = productsData.products.filter((product: Product) => product.id === Number(id));

            this.cartProducts.push({
                product: product,
                counter: 1,
            });
            console.log(this.cartProducts);
            localStorage.setItem('cart', JSON.stringify(this.cartProducts));

            const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
            cartArr.forEach((item) => {
                if (item.product.id === product.id) {
                    (target as HTMLElement).innerHTML = 'drop from cart';
                } else {
                    (target as HTMLElement).innerHTML = 'add to cart';
                }
            });
            let cartTotalCounter = 0;
            let cartTotalSum = 0;
            cartArr.forEach((item) => {
                cartTotalCounter += item.counter;
                cartTotalSum += item.product.price * item.counter;
                localStorage.setItem('totalSum', String(cartTotalSum));
                localStorage.setItem('totalCounter', String(cartTotalCounter));
            });
        }
    }
}

export const productsContainer = new ProductsContainer({
    selector: 'products-container',
    innerComponents: null,
    getTemplate() {
        let cardsTemplate = ``;
        productsData.products.forEach((product: Product) => {
            cardsTemplate += `
                <div data-category="${product.category}" data-brand="${product.brand}" data-price="${product.price}" data-stock="${product.stock}"  data-discount="${product.discountPercentage}" class="product col-lg-4 col-md-6 col-12">
                <div class="product__container">
                    <div class="product__title">
                     ${product.title}
                    </div>
                    <div class="product__image">
                        <img alt="" src="${product.thumbnail}">
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
                        <button id=${product.id} class="button btn__to-cart">add to cart</button>
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
