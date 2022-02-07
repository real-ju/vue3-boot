import type { AxiosRequestConfig, Method } from 'axios';

export interface RequestOptions {
  auth?: boolean;
}

export interface ExpandRequestConfig extends AxiosRequestConfig {
  requestOptions: Required<RequestOptions>;
}

export interface PartialExpandRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface RequestParams {
  url: string;
  method: Method;
  data?: any;
}
