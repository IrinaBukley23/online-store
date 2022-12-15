import { appModule } from './app/app.module';
import { bootstrap } from './routes';
import { wfm } from './routes/index';
import './style.scss';

wfm.delay(2000).then( () => {
    bootstrap(appModule);
} );
