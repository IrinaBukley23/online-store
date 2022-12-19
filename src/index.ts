import 'bootstrap';
import './scss/style.scss';

import { appModule } from './app/app.module';
import { bootstrap, wfm } from './routes';

wfm.delay(2000).then(() => {
    bootstrap(appModule);
});
