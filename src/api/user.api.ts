import type { LoginParams, LoginResult, LogoutParams } from '../interface/user/login';
import { request } from './request';
const baseURL = import.meta.env.VITE_BASE_URL;


export const apiLogin = (data: LoginParams) => request<LoginResult>('post', `${baseURL}auth/login`, data);