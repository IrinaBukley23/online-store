import { WFMModule } from '../routes';
import { appComponent } from './app.component';

class AppModule extends WFMModule {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(config: any) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    appComponent,
  ],
});
