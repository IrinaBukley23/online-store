import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';
import { categoryFilter } from './categoryFilter/categoryFilter';
import { brandFilter } from './brandFilter/brandFilter';
import { dualSliderStock } from './dualSlider/dualSliderStock';
import { dualSliderPrice } from './dualSlider/dualSliderPrice';

class Filter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const filter = new Filter({
    selector: 'filter',
    innerComponents: [categoryFilter, brandFilter, dualSliderStock, dualSliderPrice],
    getTemplate: () => `
      <category-filter class="filter__block category-filter"></category-filter>
      <brand-filter class="filter__block brand-filter"></brand-filter>
      <dual-slider-stock class="dual-slider"></dual-slider-stock>
      <dual-slider-price class="dual-slider"></dual-slider-price>
    `,
});
