export interface ModuleInterface {
    bootstrapComponent: ComponentConfig;
    routes: Route[];
    start: () => void;
}
export interface ModuleConfig {
    bootstrapComponent: ComponentInterface;
    routes: Route[];
}

export interface ComponentInterface {
    el: HTMLElement | null;
    selector: string;
    innerComponents: null | ComponentInterface[];
    getTemplate: (params?: {[key: string]: string}) => string;
    render: () => void;
    initInnerComponents: () => void;
    events?: () => { [key: string]: string };
    imageSelector?: string;
    detailsSelector?: string;
    cartSelector?: string;
    getProdImg?(e: Event): void;
    getDetails?(e: Event): void;
    addToCart?(e: Event): void;
}

export interface ComponentConfig {
    selector: string;
    getTemplate: (params?: {[key: string]: string}) => string;
    innerComponents: null | ComponentInterface [];
    render?: () => void;
}

export interface Route {
    path: string;
    component: ComponentInterface ;
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

export interface CartItem {
    id: number;
    counter: number;
}

export interface EventsObject {
    [key: string]: string;
}
