import { Route } from '../types';
import { homePage } from './pages/homePage/homePage';
import { notFoundPage } from './pages/notFoundPage/notFoundPage';
import { singlePage } from './pages/singlePage/singlePage';

export const appRoutes: Route[] = [
    { path: '', component: homePage },
    { path: 'single', component: singlePage },
    { path: '**', component: notFoundPage },
];
