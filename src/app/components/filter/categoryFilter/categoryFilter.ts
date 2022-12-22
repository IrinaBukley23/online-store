import { WFMComponent } from '../../../../routes';
import { ComponentConfig } from '../../../../types';

class CategoryFilter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const categoryFilter = new CategoryFilter({
    selector: 'category-filter',
    innerComponents: null,
    template: `
      cat filter
    `,
});
