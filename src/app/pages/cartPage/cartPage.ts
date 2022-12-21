import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import { productsData } from '../../../data/productsData';

import './cartPage.scss';

class CartPage extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const cartPage = new CartPage({
    selector: 'notFound',
    innerComponents: null,
    template: `
      <section class="cart">
        <div>Песочница</div>
        <div class="cart__wrapper">
          <h2 class="cart__title">${productsData.products[0].title}</h2>
          <div class="cart__info">
            <div class="cart__info-images">
              <img src=${productsData.products[0].images[0]} alt=${productsData.products[0].title}>
              <ul class="images__list">
                <li class="images__list-item">
                  <img src=${productsData.products[0].images[0]} alt=${productsData.products[0].title}>
                </li>
                <li class="images__list-item">
                  <img src=${productsData.products[0].images[2]} alt=${productsData.products[0].title}>
                </li>
                <li class="images__list-item">
                  <img src=${productsData.products[0].images[3]} alt=${productsData.products[0].title}>
                </li>
              </ul>
            </div>
            <div class="cart__info-descr">
              <ul class="descr__list">
                <li class="descr__list-item">
                  <p class="descr__list-item_top">Description:</p>
                  <p class="descr__list-item_bottom">${productsData.products[0].description}</p>
                </li>
                <li class="descr__list-item">
                  <p class="descr__list-item_top">Discount Percentage:</p>
                  <p class="descr__list-item_bottom">${productsData.products[0].discountPercentage}</p>
                </li>
                <li class="descr__list-item">
                <p class="descr__list-item_top">Rating:</p>
                <p class="descr__list-item_bottom">${productsData.products[0].rating}</p>
                </li>
                <li class="descr__list-item">
                <p class="descr__list-item_top">Stock:</p>
                <p class="descr__list-item_bottom">${productsData.products[0].stock}</p>
                </li>
                <li class="descr__list-item">
                <p class="descr__list-item_top">Brand:</p>
                <p class="descr__list-item_bottom">${productsData.products[0].brand}</p>
                </li>
                <li class="descr__list-item">
                <p class="descr__list-item_top">Category:</p>
                <p class="descr__list-item_bottom">${productsData.products[0].category}</p>
                </li>
              </ul>
            </div>
            <div class="cart__info-price">
              <div class="cart__info-price_sum">€${productsData.products[0].price}</div>
              <button class="cart__info-price_btn">add to cart</button>
              <button class="cart__info-price_btn">buy now</button>
            </div>
          </div>
        </div>
      </section>
    `,
});
