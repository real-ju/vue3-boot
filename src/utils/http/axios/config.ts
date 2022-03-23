import type { RequestOptions, ExpandRequestConfig } from './types';

import { ContentTypeEnum } from '/@/enums/httpEnum';

export const defaultRequestOptions: Required<RequestOptions> = {
  // 请求是否需要登录鉴权
  auth: true,
  contentType: ContentTypeEnum.JSON,
  customToken: false
};

export const axiosRequestConfig: Omit<ExpandRequestConfig, 'requestOptions'> &
  Required<Pick<ExpandRequestConfig, 'requestOptions'>> = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10 * 1000,
  requestOptions: defaultRequestOptions
};
