import type { RequestOptions, ExpandRequestConfig } from './types';
import { getEnv } from '/@/utils/env';

import { ContentTypeEnum } from '/@/enums/httpEnum';

export const defaultRequestOptions: Required<RequestOptions> = {
  // 请求是否需要登录鉴权
  auth: true,
  // http Content-Type
  contentType: ContentTypeEnum.JSON,
  // 自定义Token字符串
  customToken: false,
  // 根据响应数据中的“自定义状态码”判断是resolve还是reject Promise
  // 如果validateCustomStatus返回true，则Promise将会resolved，否则是rejected
  validateCustomStatus: function (response) {
    return true;
  },
  // 处理自定义错误 validateCustomStatus返回false时执行
  handleCustomError: function (response) {}
};

export const axiosRequestConfig: Omit<ExpandRequestConfig, 'requestOptions'> &
  Required<Pick<ExpandRequestConfig, 'requestOptions'>> = {
  baseURL: getEnv().VITE_API_BASE_URL,
  timeout: 10 * 1000,
  requestOptions: defaultRequestOptions
};
