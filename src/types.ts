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
  component: ConfigPage;
  module?: any;
}

export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
