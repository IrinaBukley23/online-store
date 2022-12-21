import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';

class SinglePage extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const singlePage = new SinglePage({
    selector: 'single',
    innerComponents: null,
    template: '<h1>Single page</h1>',
});
