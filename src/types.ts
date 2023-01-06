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
    getTemplate: (params?: { [key: string]: string }) => string;
    render: () => void;
    initInnerComponents: () => void;
    clickSelector?: string;
}

export interface ComponentConfig {
    selector: string;
    getTemplate: (params?: { [key: string]: string }) => string;
    innerComponents: null | ComponentInterface[];
    render?: () => void;
}

export interface Route {
    path: string;
    component: ComponentInterface;
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

type PartialProduct = Partial<Product>;

export type QueryParamsRequired = Record<keyof PartialProduct, string>;

export type QueryParams = Partial<QueryParamsRequired> & {
    sort?: string;
    search?: string;
}

export interface CartItem {
    product: Product;
    counter: number;
    flag: boolean;
}

export interface ProductsData {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}


export interface PromoCodesText {
    rs: string; 
    epm: string;
}