import { WFMComponent } from '../../../routes/index';
import { ComponentConfig, Product } from '../../../types';
import { productsData } from '../../../data/productsData';
import './singlePage.scss';

class SinglePage extends WFMComponent {
  constructor(config: ComponentConfig) {
      super(config);
  }

  clickSelector = '.images__list-item';
    handleClick = (event: Event): void => {
      const target = event.target;
      if(!(target as HTMLElement).classList.contains('images__list-item')) return;
      console.log()
      this.el?.querySelectorAll('.images__list-item').forEach((imageItem) => imageItem.classList.remove('active'));
      if (!target) return; 
      (target as HTMLElement).classList.add('active');
      if((target as HTMLElement).classList.contains('active')) {
        const elem = document.querySelector('.images__large');
        const currentImgSrc = ((target as HTMLElement).childNodes[1] as HTMLElement).getAttribute('src')
        if(elem) elem.innerHTML = `<img src=${currentImgSrc} alt="photo">`;
      }
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

    const uniqImages = [... new Set(product.images)];
    console.log(uniqImages, product.images)
    uniqImages.forEach(img => {
      imagesCards += `<li class="images__list-item">
        <img src=${img} alt='photo'>
      </li>`;
    })

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
          <button class="single__info-price_btn">add to single</button>
          <button class="single__info-price_btn">buy now</button>
        </div>
      </div>
      </div>
    </section>`
  }
});
