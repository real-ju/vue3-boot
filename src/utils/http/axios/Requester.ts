import axios from 'axios';
import { axiosRequestConfig } from './config';
import { store } from '/@/store';
import { router } from '/@/router';
import { RequestMethodEnum } from '/@/enums/httpEnum';

import type { AxiosInstance } from 'axios';
import type {
  RequestOptions,
  ExpandRequestConfig,
  RequestParams
} from './types';

export class Requester {
  private axiosRequestConfig: ExpandRequestConfig; // 实例请求配置
  private axiosInstance: AxiosInstance;

  constructor(options: RequestOptions = {}) {
    this.axiosRequestConfig = this.computeAxiosRequestConfig(
      axiosRequestConfig,
      options
    );
    this.axiosInstance = axios.create(this.axiosRequestConfig);
    this.setupInterceptors();
  }

  private computeAxiosRequestConfig(
    config: ExpandRequestConfig,
    options: RequestOptions
  ): ExpandRequestConfig {
    Object.assign(config.requestOptions, options);
    return config;
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: ExpandRequestConfig) => {
        if (
          config.requestOptions?.auth &&
          store.getters['auth/isLogin'] &&
          config.headers
        ) {
          config.headers['Token'] = store.getters['auth/token'];
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 请求超时 重新发起请求
        if (error.code === 'ECONNABORTED') {
          return new Promise((resolve, reject) => {
            this.axiosInstance
              .request(error.config)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          });
        } else if (error.response.status === 401) {
          store.commit('auth/logout');
          router.push('/login');

          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  get(requestParams: Omit<RequestParams, 'method'>, options?: RequestOptions) {
    return this.request(
      {
        ...requestParams,
        method: RequestMethodEnum.GET
      },
      options
    );
  }

  post(requestParams: Omit<RequestParams, 'method'>, options?: RequestOptions) {
    return this.request(
      {
        ...requestParams,
        method: RequestMethodEnum.POST
      },
      options
    );
  }

  put(requestParams: Omit<RequestParams, 'method'>, options?: RequestOptions) {
    return this.request(
      {
        ...requestParams,
        method: RequestMethodEnum.PUT
      },
      options
    );
  }

  delete(
    requestParams: Omit<RequestParams, 'method'>,
    options?: RequestOptions
  ) {
    return this.request(
      {
        ...requestParams,
        method: RequestMethodEnum.DELETE
      },
      options
    );
  }

  request(requestParams: RequestParams, options?: RequestOptions) {
    let { url, method, data } = requestParams;

    return new Promise<any>((resolve, reject) => {
      let config: ExpandRequestConfig = {
        url,
        method,
        requestOptions: options
      };

      if (method === RequestMethodEnum.GET) {
        config.params = data;
      } else {
        config.data = data;
      }

      this.axiosInstance
        .request(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  }
}
