import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';

class NotFoundPage extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const notFoundPage = new NotFoundPage({
  selector: 'notFound',
  template: `
        <h1>Not found page</h1>
        <a href="#">Back to main page</a>
    `,
});
