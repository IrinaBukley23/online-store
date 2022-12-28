import { WFMComponent } from '../../../routes/index';
import { ComponentConfig, Product } from '../../../types';
import { productsData } from '../../../data/productsData';
import './singlePage.scss';

class SinglePage extends WFMComponent {
  constructor(config: ComponentConfig) {
      super(config);
  }
}

export const singlePage = new SinglePage({
  selector: 'single',
  innerComponents: null,
  getTemplate: (params?: { [id: string]: string }) => {
    if (!params?.id) return "";

    const [product] = productsData.products.filter((product: Product) => product.id === Number(params.id));
    return `<section class="single">
    <div class="single__crumbs">
      <ul class="crumbs__list">
        <li class="crumbs__list-item">Store</li>
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
          <img src=${product.images[0]} alt=${product.title}>
          <ul class="images__list">
              <li class="images__list-item">
                  <img src=${product.images[0]} alt=${product.title}>
              </li>
              <li class="images__list-item">
                  <img src=${product.images[1]} alt=${product.title}>
              </li>
              <li class="images__list-item">
                  <img src=${product.images[2]} alt=${product.title}>
              </li>
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
          <button class="single__info-price_btn">add to single</button>
          <button class="single__info-price_btn">buy now</button>
        </div>
      </div>
      </div>
    </section>`
  }
});
