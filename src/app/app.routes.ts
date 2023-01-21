import { Route } from '../types';
import { homePage } from './pages/homePage/homePage';
import { notFoundPage } from './pages/notFoundPage/notFoundPage';
import { singlePage } from './pages/singlePage/singlePage';
import { cartPage } from './pages/cartPage/cartPage';

export const appRoutes: Route[] = [
    { path: '', component: homePage },
    { path: 'single', component: singlePage },
    { path: 'cart', component: cartPage },
    { path: '**', component: notFoundPage },
];
