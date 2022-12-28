import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';
import { categoryFilter } from './categoryFilter/categoryFilter';
import { brandFilter } from './brandFilter/brandFilter';

class Filter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const filter = new Filter({
    selector: 'filter',
    innerComponents: [categoryFilter, brandFilter],
    getTemplate() {
        return `
        <category-filter class="filter__block category-filter"></category-filter>
        <brand-filter class="filter__block brand-filter"></brand-filter>
      `}
});
