import { WFMModule } from '../../../routes';
import { ConfigComp } from '../../../types';
import { homePage } from './homePage';
import { appRoutes } from '../../app.routes';
import { productsContainer } from '../../components/products/productsContainer'

class HomePageModule extends WFMModule {
    constructor(config: ConfigComp) {
        super(config);
    }
}

export const homePageModule = new HomePageModule({
    components: [productsContainer],
    bootstrap: homePage,
    routes: appRoutes,
});

