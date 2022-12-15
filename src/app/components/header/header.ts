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
        <li><a href="#">Main</a></li> 
        <li><a href="#">NotFound</a></li> 
      </ul>
    </nav>
    `,
});
