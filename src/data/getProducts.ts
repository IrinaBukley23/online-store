import { Product, ProductData } from './../types';

export const getData = (): void => {
    fetch('./productsData.json').then((response: Response): Promise<ProductData> => response.json());
};
