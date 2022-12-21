import { WFMComponent } from '../../../routes';
import { ComponentConfig } from '../../../types';

class Filter extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const filter = new Filter({
    selector: 'filter',
    innerComponents: null,
    template: `
      filter
    `,
});
