import { WFMComponent } from '../../../../routes';
import { ComponentConfig } from '../../../../types';

class BrandFilter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const brandFilter = new BrandFilter({
    selector: 'brand-filter',
    innerComponents: null,
    template: `
      brand filter
    `,
});
