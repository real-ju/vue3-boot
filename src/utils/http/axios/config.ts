import type { AxiosRequestConfig } from 'axios';
import type { RequestOptions } from './types';

import { ContentTypeEnum } from '../enum';
import qs from 'qs';

export const defaultAxiosRequestConfig: AxiosRequestConfig = {
  timeout: 5 * 60 * 1000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'comma' });
  }
};

export const defaultRequestOptions: Required<RequestOptions> = {
  // 请求是否需要登录鉴权
  auth: true,
  // http Content-Type
  contentType: ContentTypeEnum.JSON,
  // 自定义Token字符串
  customToken: false,
  // 鉴权Header名
  authHeader: 'Authorization',
  // 鉴权token前缀
  tokenPrefix: 'Bearer ',
  // 根据响应数据中的“自定义状态码”判断是resolve还是reject Promise
  // 如果validateCustomStatus返回true，则Promise将会resolved，否则是rejected
  validateCustomStatus: function (response) {
    return true;
  },
  // 处理自定义错误 validateCustomStatus返回false时执行
  handleCustomError: function (response) {},
  // 显示自定义错误提示
  showCustomErrorTip: true,
  // 获取token字符串，为空则表示未登录
  getToken: () => null,
  // 处理未授权的逻辑
  handleUnauthorized: () => {}
};
