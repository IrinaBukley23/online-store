import { WFMModule } from '../routes';
import { ModuleConfig } from '../types';
import { appComponent } from './app.component';
import { appRoutes } from './app.routes';

class AppModule extends WFMModule {
    constructor(config: ModuleConfig) {
        super(config);
    }
}

export const appModule = new AppModule({
    bootstrapComponent: appComponent,
    routes: appRoutes,
});
