import type { PageData } from '@/interface';
import type { Product } from '@/interface/product';
import { request } from './request';
const baseURL = import.meta.env.VITE_BASE_URL;

export const getProductList = (params: any) => request<PageData<Product>>('get', `${baseURL}/products`, params);