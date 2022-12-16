export interface ConfigComp {
  bootstrap: any;
  components: ConfigPage[];
  routes: Route[];
}

export interface Module {
  bootstrap: any;
  components: ConfigPage[];
  routes: Route[];
  start: () => void
}

export interface ConfigPage {
  el?: HTMLElement | null;
  selector: string;
  template: string;
}

export interface Route {
  path: string;
  component: ConfigPage
}
