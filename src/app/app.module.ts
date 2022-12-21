import { WFMModule } from '../routes';
import { ConfigComp } from '../types';
import { appComponent } from './app.component';
import { appRoutes } from './app.routes';

class AppModule extends WFMModule {
    constructor(config: ConfigComp) {
        super(config);
    }
}

export const appModule = new AppModule({
    bootstrapComponent: appComponent,
    routes: appRoutes,
});
