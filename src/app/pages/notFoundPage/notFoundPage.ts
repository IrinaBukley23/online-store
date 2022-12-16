import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';
import img from '../../../../public/error.gif';

import './notFoundPage.scss';

class NotFoundPage extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const notFoundPage = new NotFoundPage({
  selector: 'notFound',
  template: `
      <div class="error">
        <p class="error__text">Page doesn't exist</p>
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src=${img} alt="Error"/>
        <a class="error__link" href="#">Back to main page</a>
      </div>
    `,
});
