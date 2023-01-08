import { WFMComponent } from '../../../routes/index';
import { CartItem, ComponentConfig, Product } from '../../../types';
import { productsData } from '../../../data/productsData';
import './singlePage.scss';

class SinglePage extends WFMComponent {
  constructor(config: ComponentConfig) {
      super(config);
  }

  cartProducts: CartItem[] = [];
  public handleClick(event: Event): void {
    const target = event.target as HTMLElement;

    const smallImage = target.classList.contains('images__list-item_img');
    if (smallImage) this.imageChange(target);
    
    const addToCartBtn = target.classList.contains('add-to-cart');
    if(addToCartBtn) this.addToCart(target);

    const dropFromCart = target.classList.contains('btn__drop');
    if(dropFromCart) this.dropProduct(target);

    const fastPurchaseBtn = target.classList.contains('fast_purchase');
    if(fastPurchaseBtn) {
      this.openPopup();
      this.addToCart(target);
    }
  }

  private imageChange(elem: HTMLElement) {
    if(!(elem).classList.contains('images__list-item_img')) return;
    this.el?.querySelectorAll('.images__list-item_img').forEach((imageItem) => imageItem.classList.remove('active'));
    if (!elem) return;
    (elem).classList.add('active');
    if((elem).classList.contains('active')) {
      const imgLarge = document.querySelector('.images__large');
      const currentImgSrc = ((elem) as HTMLElement).getAttribute('src')
      if(imgLarge) imgLarge.innerHTML = `<img src=${currentImgSrc} alt="photo">`;
    }
  }

  private dropProduct(elem: HTMLElement) {
    let cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
    const productsContainer = document.querySelector('.cart__products-block');
    elem.classList.remove('btn__drop');
    elem.classList.add('btn__to-cart');
    elem.innerHTML = 'add to cart';
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

  private addToCart(elem: HTMLElement) {
    const id = (elem).getAttribute('id');
    if(!id) return;
    const [product] = productsData.products.filter((product: Product) => product.id === Number(id));
    elem.classList.add('btn__drop');
    elem.classList.remove('btn__to-cart');
    elem.innerHTML = 'drop from cart';
    this.cartProducts.push({
        'product': product,
        'counter': 1,
        'flag': true,
    });
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));

    const cartArr: CartItem[] = JSON.parse(localStorage.getItem('cart') as string);
    let cartTotalCounter = 0;
    let cartTotalSum = 0;
    cartArr.forEach(item => {
        cartTotalCounter += item.counter;
        cartTotalSum += (item.product.price * item.counter);
        localStorage.setItem('totalSum', String(cartTotalSum))
        localStorage.setItem('totalCounter', String(cartTotalCounter))
    })

    const headerTotalCounterEl = document.querySelector('.header__count') as HTMLElement;
    if(headerTotalCounterEl) {
        headerTotalCounterEl.innerHTML = `${cartTotalCounter}`;
    }
    const headerTotalSumEl = document.querySelector('.header__sum p span') as HTMLElement;
    if(headerTotalSumEl) {
        headerTotalSumEl.innerHTML = `${cartTotalSum}`;
    }

    cartArr.forEach((item) => {
        if (item.product.id === product.id) {
            elem.innerHTML = 'drop from cart';
        } else {
            elem.innerHTML = 'add to cart';
        }
    });
  }

  private openPopup() {
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.add('active');
}
}

export const singlePage = new SinglePage({
  selector: 'single',
  innerComponents: null,
  getTemplate: (params?: { [id: string]: string }) => {
    if (!params?.id) return "";
    const [product] = productsData.products.filter((product: Product) => product.id === Number(params.id));
    let imagesCards = '';
    const largeImg = `<img src=${product.images[0]} alt=${product.title}>`;

    product.images.forEach(img => {
      imagesCards += `<li class="images__list-item">
        <img class="images__list-item_img" src=${img} alt='photo'>
      </li>`;
    })

    return `<section class="single">
    <div class="single__crumbs">
      <ul class="crumbs__list">
        <li class="crumbs__list-item"> <a href="#">Store</a> </li>
        <li class="crumbs__list-item"> >> </li>
        <li class="crumbs__list-item">${product.category}</li>
        <li class="crumbs__list-item"> >> </li>
        <li class="crumbs__list-item">${product.brand}</li>
        <li class="crumbs__list-item"> >> </li>
        <li class="crumbs__list-item">${product.title}</li>
      </ul>
    </div>
    <div class="single__wrapper">
      <h2 class="single__title">${product.title}</h2>
      <div class="single__info">
        <div class="single__info-images">
          <div class="images__large">
            ${largeImg}
          </div>
          <ul class="images__list">
              ${imagesCards}
          </ul>
        </div>
        <div class="single__info-descr">
          <ul class="descr__list">
            <li class="descr__list-item">
              <p class="descr__list-item_top">Description:</p>
              <p class="descr__list-item_bottom">${product.description}</p>
            </li>
            <li class="descr__list-item">
              <p class="descr__list-item_top">Discount Percentage:</p>
              <p class="descr__list-item_bottom">${product.discountPercentage}</p>
            </li>
            <li class="descr__list-item">
            <p class="descr__list-item_top">Rating:</p>
            <p class="descr__list-item_bottom">${product.rating}</p>
            </li>
            <li class="descr__list-item">
            <p class="descr__list-item_top">Stock:</p>
            <p class="descr__list-item_bottom">${product.stock}</p>
            </li>
            <li class="descr__list-item">
            <p class="descr__list-item_top">Brand:</p>
            <p class="descr__list-item_bottom">${product.brand}</p>
            </li>
            <li class="descr__list-item">
            <p class="descr__list-item_top">Category:</p>
            <p class="descr__list-item_bottom">${product.category}</p>
            </li>
          </ul>
        </div>
        <div class="single__info-price">
          <div class="single__info-price_sum">€${product.price}</div>
          <button id=${product.id} class="single__info-price_btn add-to-cart">add to cart</button>
          <a id=${product.id} href="#cart" class="single__info-price_btn fast_purchase">buy now</a>
        </div>
      </div>
      </div>
    </section>`
  }
});
