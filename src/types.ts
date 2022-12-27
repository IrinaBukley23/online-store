export interface ModuleInterface {
    bootstrapComponent: ComponentConfig;
    routes: Route[];
    start: () => void;
}
export interface ModuleConfig {
    bootstrapComponent: ComponentInterface;
    routes: Route[];
}

export interface ComponentInterface  {
    el: HTMLElement | null;
    selector: string;
    template: string;
    innerComponents: null | ComponentInterface[];
    render: () => void;
    initInnerComponents: () => void;
    events?: () => { [key: string]: string };
    clickSelector?: string;
    handleClick?: (e:Event) => void;
}

export interface ComponentConfig {
    selector: string;
    template: string;
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

export interface EventsObject {
    [key: string]: string;
}
