import { WFMComponent } from '../../../routes';
import { ConfigPage } from '../../../types';
import './header.scss';

class Header extends WFMComponent {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: ConfigPage) {
    super(config);
  }
}

export const header = new Header({
  selector: 'app-header',
  template: `
  <nav>
    <a href="#">Online-store</a>
    <ul>
      <li><a href="#">Home Page</a></li> 
      <li><a href="#single">Single Page</a></li> 
    </ul>
  </nav>
  `,
});
