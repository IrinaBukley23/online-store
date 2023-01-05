import { ComponentConfig } from '../../../types';
import { WFMComponent } from '../../../routes';
import { productsData } from '../../../data/productsData';

class FoundProductQuantity extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const foundProductQuantity = new FoundProductQuantity({
    selector: 'found-product-quantity',
    innerComponents: null,
    getTemplate: () => `
          Products found: ${productsData.products.length}
    `,
});
