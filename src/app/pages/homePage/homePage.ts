import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';

class HomePage extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ConfigPage) {
        super(config);
    }
}

export const homePage = new HomePage({
    selector: 'home',
    template: `
        <products class="d-flex"></products>
    `,
});
