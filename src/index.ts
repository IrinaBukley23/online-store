import { appModule } from './app/app.module';
import { bootstrap, wfm } from './routes';

import 'bootstrap';
import './scss/style.scss';

wfm.delay(2000).then(() => {
    bootstrap(appModule);
});
