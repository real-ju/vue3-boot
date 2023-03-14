import type { AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from 'axios';

export interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface RequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks;
  headers?: any;
}

export interface Result {
  code?: number | string;
  message?: string;
  data?: any;
  headers?: any;
}
