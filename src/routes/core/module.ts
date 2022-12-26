import { ModuleConfig, Route, ComponentInterface } from '../../types';
import { router } from '../tools/router';
import { wfm } from '../tools/utils';

export class Module implements ModuleInterface {
    bootstrapComponent: ComponentInterface;
    routes: Route[];

    constructor(config: ModuleConfig) {
        this.bootstrapComponent = config.bootstrapComponent;
        this.routes = config.routes;
    }

    start(): void {
        this.bootstrapComponent.render();
        if (this.routes) this.initRoutes();
    }

    initRoutes(): void {
        window.addEventListener('hashchange', this.renderRoute.bind(this));
        this.renderRoute();
    }

    renderRoute(): void {
        const url = router.getUrl();
        let route = this.routes.find((r: Route) => r.path === url);
        if (wfm.isUndefined(route as Route)) {
            route = this.routes.find((r: Route) => r.path === '**');
        }
        const elem = document.querySelector('router-outlet') as HTMLElement;
        elem.innerHTML = `<${route?.component.selector} class="${route?.component.selector} wrapper"></${route?.component.selector}>`;
        if (route) this.renderComponent(route.component);
    }

    renderComponent(c: ComponentInterface): void {
        if (c.render) c.render();
    }
}
