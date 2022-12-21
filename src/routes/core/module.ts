import { ConfigComp, ConfigPage, Route } from '../../types';
import { router } from '../tools/router';
import { wfm } from '../tools/utils';

export class Module {
  components: ConfigPage[];

  bootstrapComponent: any;

  routes: Route[];

  constructor(config: ConfigComp) {
    this.components = config.components;
    this.bootstrapComponent = config.bootstrap;
    this.routes = config.routes;
  }

  start(): void {
    this.initComponents();
    if (this.routes) this.initRoutes();
  }

  initComponents(): void {
    this.bootstrapComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
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
    elem.innerHTML = `<${route?.component.selector}></${route?.component.selector}>`;
    this.renderComponent(route?.component);

    if (route?.module) {
      const module = route.module;
      module.initComponents();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderComponent(c: any): void {
    // type c: ConfigPage
    c.render();
  }
}
