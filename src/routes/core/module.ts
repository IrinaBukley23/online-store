import { router } from "../tools/router";
import { wfm } from "../tools/utils";

export class Module {
  components: any;
  bootstrapComponent: any;
  routes: any;

  constructor(config: any) {
    this.components = config.components;
    this.bootstrapComponent = config.bootstrap;
    this.routes = config.routes;
  }

  start(): void {
    this.initComponents();
    if(this.routes) this.initRoutes();
  }

  initComponents(): void {
    this.bootstrapComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  renderRoute() {
    let url = router.getUrl();
    let route = this.routes.find((r: any ) => r.path === url);
    console.log(route)
    if(wfm.isUndefined(route)) {
      route = this.routes.find((r: any) => r.path === '**');
    }
    (document.querySelector('router-outlet') as HTMLElement).innerHTML = `<${route.component.selector}></${route.component.selector}>`;
    this.renderComponent(route.component)
  }

  renderComponent(c: any) {
    c.render();
  }
}
