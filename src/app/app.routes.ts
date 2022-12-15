import { homePage } from './pages/homePage/homePage';
import { notFoundPage } from './pages/notFoundPage/notFoundPage';
import { singlePage } from './pages/singlePage/singlePage';

export const appRoutes: any = [
    { path: '', component: homePage },
    { path: 'single', component: singlePage },
    { path: '**', component: notFoundPage }
];
