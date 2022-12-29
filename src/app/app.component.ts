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
    getTemplate: () => `
        <app-header class="header"></app-header>
        <router-outlet>
        </router-outlet>
        <app-footer class="footer"></app-footer>
    `,
});
