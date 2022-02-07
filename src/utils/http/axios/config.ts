import type { RequestOptions, ExpandRequestConfig } from './types';

export const defaultRequestOptions: Required<RequestOptions> = {
  // 请求是否需要登录鉴权
  auth: true
};

export const axiosRequestConfig: ExpandRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10 * 1000,
  requestOptions: defaultRequestOptions
};
