import { WFMComponent } from '../../../routes/index';
import { ComponentConfig } from '../../../types';
import img from '../../../../public/error.gif';

import './notFoundPage.scss';

class NotFoundPage extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const notFoundPage = new NotFoundPage({
    selector: 'notFound',
    innerComponents: null,
    getTemplate: () => `
      <div class="error">
        <p class="error__text">Page doesn't exist</p>
        <img class="error__image" src=${img} alt="Error"/>
        <a class="error__link" href="#">Back to main page</a>
      </div>
    `,
});
