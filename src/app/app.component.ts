import { WFMComponent } from '../routes';
import { ConfigPage } from '../types';

export class AppComponent extends WFMComponent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor( config: ConfigPage) {
        super(config);
    }
}

export const appComponent = new AppComponent({
    selector: 'app-root',
    template: `
        <app-header class="wrapper"></app-header>
        <router-outlet id="card-container" class="wrapper">
        </router-outlet>
        <app-footer class="footer"></app-footer>
    `,
});
