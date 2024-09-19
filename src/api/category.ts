import type { Category } from '@/interface/categories';
import { request } from './request';
const baseURL = import.meta.env.VITE_BASE_URL;

export const getCategories = () => request<Category>('get', `${baseURL}/admin/categories`);
