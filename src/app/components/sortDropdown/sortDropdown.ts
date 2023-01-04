import { ComponentConfig } from '../../../types';
import { WFMComponent } from '../../../routes';

class SortDropdown extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const sortDropdown = new SortDropdown({
    selector: 'sort-dropdown',
    innerComponents: null,
    getTemplate: () => `
                <div class="dropdown sort">
                  <button class="sort__title btn btn-secondary btn-lg dropdown-toggle" type="button" id="sortProductDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Sort products
                  </button>
                  <ul class="sort__menu dropdown-menu" aria-labelledby="sortProductDropdown">
                    <li><a class="dropdown-item sort__item" data-sort="price-desc" href="#">Price ↓</a></li>
                    <li><a class="dropdown-item sort__item" data-sort="price-asc" href="#">Price ↑</a></li>
                    <li><a class="dropdown-item sort__item" data-sort="discount-desc" href="#">Discount ↓</a></li>
                    <li><a class="dropdown-item sort__item" data-sort="discount-asc" href="#">Discount ↑</a></li>
                  </ul>
                </div>
    `,
});
