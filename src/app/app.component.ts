import { WFMComponent } from '../routes';
import { ComponentConfig } from '../types';
import { header } from './components/header/header';
import { footer } from './components/footer/footer';

export class AppComponent extends WFMComponent {
    constructor(config: ComponentConfig) {
        super(config);
    }
}

export const appComponent = new AppComponent({
    selector: 'app-root',
    innerComponents: [header, footer],
    template: `
        <app-header class="wrapper"></app-header>
        <router-outlet id="card-container" class="wrapper">
        </router-outlet>
        <app-footer class="footer"></app-footer>
    `,
});
