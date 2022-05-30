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
  // 显示响应中的错误信息
  showErrorTip: false,
  // 自定义错误提示UI逻辑
  customErrorTip: function (res) {
    console.warn('请使用customErrorTip参数实现错误提示UI逻辑');
  }
};

export const axiosRequestConfig: Omit<ExpandRequestConfig, 'requestOptions'> &
  Required<Pick<ExpandRequestConfig, 'requestOptions'>> = {
  baseURL: getEnv().VITE_API_BASE_URL,
  timeout: 10 * 1000,
  requestOptions: defaultRequestOptions
};
