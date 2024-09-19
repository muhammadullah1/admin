import type { AxiosRequestConfig, Method } from 'axios';
import { message as $message } from 'antd';
import axios from 'axios';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
const token = localStorage.getItem('t');

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
   return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    
    return response?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    let errorMessage = 'Login first';

    if (error?.message?.includes('Network Error')) {
      errorMessage = 'Network Error';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    error.message && $message.error(errorMessage);

    return {
      success: false,
      message: errorMessage,
      data: null,
    };
  },
);

export type Response = {
  success: boolean;
  message: string;
  data: any;
};

export type MyResponse<T = any> = Promise<Response>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse => {

  const headers: { [key: string]: string; } = {
    'Content-Type': 'application/json',
  };
  headers.Authorization = `${token}`;

  if (method === 'post') {
    return axiosInstance.post(url, data, { ...config, headers });
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
      headers,
    });
  }
};
