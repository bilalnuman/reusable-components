import apiClient from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';

export const fetchProducts = (params?:string) => {
    console.log(params)
    const filters=Object.keys(params).length?params:""
    return apiClient.get(`${API_ROUTES.inventory.products}${filters}`).then(res => res.data);
};

export const fetchProductById = (id: string) => {
    return apiClient.get(API_ROUTES.inventory.productById(id)).then(res => res.data);
};

export const createProduct = (product: any) => {
    return apiClient.post(API_ROUTES.inventory.products, product);
};
