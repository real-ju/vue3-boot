import axios from 'axios';
import { axiosRequestConfig } from './config';
import { store } from '/@/store';
import { router } from '/@/router';
import { RequestMethodEnum, ContentTypeEnum } from '/@/enums/httpEnum';
import qs from 'qs';
import { PageEnum } from '/@/enums/pageEnum';

import type { AxiosInstance } from 'axios';
import type {
  RequestOptions,
  ExpandRequestConfig,
  RequestParams,
  UploadFileParams
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

  private handleResponseError(response: any) {
    const requestOptions: Required<RequestOptions> =
      response.config.requestOptions;

    // handle error tip
    if (requestOptions.showErrorTip) {
      requestOptions.customErrorTip(response);
    }
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config: ExpandRequestConfig) => {
        config.headers = config.headers || {};

        // handle token
        if (config.requestOptions!.auth! && store.getters['auth/isLogin']) {
          const customToken = config.requestOptions!.customToken;
          config.headers['Token'] = customToken
            ? customToken
            : store.getters['auth/token'];
        }

        // handle ContentType
        const contentType = (config.headers['Content-Type'] =
          config.requestOptions!.contentType!);

        if (
          contentType === ContentTypeEnum.FORM_URLENCODED &&
          config.method !== RequestMethodEnum.GET &&
          Reflect.has(config, 'data')
        ) {
          config.data = qs.stringify(config.data, { arrayFormat: 'brackets' });
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
        const requestOptions: Required<RequestOptions> = (
          response.config as any
        ).requestOptions;

        if (requestOptions.validateCustomStatus(response)) {
          return response;
        } else {
          this.handleResponseError(response);
          return Promise.reject(response);
        }
      },
      (error) => {
        if (error.code === 'ECONNABORTED') {
          // 请求超时 重新发起请求
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
        } else if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 401) {
            store.commit('auth/logout');
            router.push(PageEnum.LOGIN);
          }

          this.handleResponseError(error.response);

          return Promise.reject(error);
        }
      }
    );
  }

  uploadFile(params: UploadFileParams, options?: RequestOptions) {
    const formData = new FormData();
    const customFileName = params.name || 'file';

    const files = ([] as Blob[]).concat(params.file);
    const nameField =
      files.length === 1 ? customFileName : `${customFileName}[]`;
    files.forEach((file) => {
      if (params.filename) {
        formData.append(nameField, file, params.filename);
      } else {
        formData.append(nameField, file);
      }
    });

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });
    }

    options = options || {};

    return this.request(
      {
        url: params.url,
        method: RequestMethodEnum.POST,
        data: formData
      },
      {
        ...options,
        contentType: ContentTypeEnum.FORM_DATA
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
          reject(error.response || error);
        });
    });
  }
}
