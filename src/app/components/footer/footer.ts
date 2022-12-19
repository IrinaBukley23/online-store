import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import './footer.scss';

class Footer extends WFMComponent {
    constructor(config: ConfigPage) {
        super(config);
    }
}

export const header = new Footer({
    selector: 'app-footer',
    template: `
  
  `,
});
