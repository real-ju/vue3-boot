import type { AxiosRequestConfig } from 'axios';

import { RequestMethodEnum } from '/@/enums/httpEnum';

export interface RequestOptions {
  auth?: boolean;
}

export interface ExpandRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
}

export interface RequestParams {
  url: string;
  method: RequestMethodEnum;
  data?: any;
}
