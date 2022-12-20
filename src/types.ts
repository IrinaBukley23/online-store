export interface ConfigComp {
    bootstrap: any;
    components: ConfigPage[];
    routes: Route[];
}

export interface Module {
    bootstrap: any;
    components: ConfigPage[];
    routes: Route[];
    start: () => void;
}

export interface ConfigPage {
    el?: HTMLElement | null;
    selector: string;
    template: string;
}

export interface Route {
    path: string;
    component: ConfigPage;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductData {
    products: Product[];
}
