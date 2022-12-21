import { Route } from '../types';
import { homePage } from './pages/homePage/homePage';
import { notFoundPage } from './pages/notFoundPage/notFoundPage';
import { singlePage } from './pages/singlePage/singlePage';
import { homePageModule } from './pages/homePage/homePage.module';

export const appRoutes: Route[] = [
  { path: '', component: homePage, module: homePageModule },
  { path: 'single', component: singlePage },
  { path: '**', component: notFoundPage },
];
