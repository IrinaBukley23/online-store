import { WFMModule } from '../routes';
import { ConfigComp } from '../types';
import { appComponent } from './app.component';
import { appRoutes } from './app.routes';
import { header } from './components/header/header';
import { products } from './components/products/products';

class AppModule extends WFMModule {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(config: ConfigComp) {
        super(config);
    }
}

export const appModule = new AppModule({
    components: [header, products],
    bootstrap: appComponent,
    routes: appRoutes,
});
