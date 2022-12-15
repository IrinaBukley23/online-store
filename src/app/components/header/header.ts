import { WFMComponent } from "../../../routes";
import './header.scss';

class Header extends WFMComponent {
  constructor(config: any) {
      super(config)
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
