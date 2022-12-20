
import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import './products.scss';

class Products extends WFMComponent {
  constructor(config: ConfigPage) {
   super(config);
  }

}

export const container = new Products({
  selector: 'container',
  template: ``,
});
