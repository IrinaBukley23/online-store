import { WFMComponent } from '../../../routes/index';
import { ConfigPage } from '../../../types';

class SinglePage extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const singlePage = new SinglePage({
  selector: 'single',
  template: '<h1>Single page</h1>',
});
