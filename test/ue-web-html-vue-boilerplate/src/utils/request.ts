import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Authorization } from '@/store/mutation-types';
import { storageItem } from '@/utils/session';
import { message, notification } from 'ant-design-vue';
import type { RequestConfig, Result } from '#/axios';

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000 // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  if (Boolean(error.response)) {
    if (error.response?.status !== 200) {
      notification.error({
        message: error.response?.status,
        description: error.response?.statusText
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: RequestConfig) => {
  const token = storageItem.getItem(Authorization);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (config.url === '/auth/oauth/token') {
    config.headers.Authorization = 'Basic c3VwZXJsdWN5X3N5bmVyZ3k6c3luZXJneS0xcWF6LTJ3c3g=';
    config.headers['Content-Type'] = 'multipart/form-data; boundary=something';
  } else {
    if (Boolean(token)) {
      config.headers.Authorization = `Bearer ${String(token)}`;
    }
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
  const result = response.data ?? {};
  if (+result.code !== 0) {
    void message.error(result.message);
  }
  return response;
}, errorHandler);

const httpRequest = async function (config: AxiosRequestConfig) {
  const response = await request(config);
  if (response.config.responseType === 'blob') {
    return { data: response.data, headers: response.headers };
  } else {
    return response.data;
  }
};

export { request, httpRequest };
