import { WFMModule } from '../routes';
import { appComponent } from './app.component';
import { appRoutes } from '../app/app.routes';
import { header } from './components/header/header';

class AppModule extends WFMModule {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: any) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    header
  ],
  bootstrap: appComponent,
  routes: appRoutes
});
