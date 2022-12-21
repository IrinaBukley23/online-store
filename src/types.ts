export interface Module {
    bootstrapComponent: ComponentConfig;
    components: ComponentConfig[];
    routes: Route[];
    start: () => void;
}
export interface ModuleConfig {
    bootstrapComponent: Component;
    routes: Route[];
}

export interface Component {
    el: HTMLElement | null;
    selector: string;
    template: string;
    innerComponents: null | Component[];
    render: () => void;
    initInnerComponents: () => void;
}

export interface ComponentConfig {
    selector: string;
    template: string;
    innerComponents: null | Component[];
}

export interface Route {
    path: string;
    component: Component;
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
