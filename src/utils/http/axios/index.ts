import { Requester } from './Requester';

import type { RequestOptions } from './types';

function createRequester(options: RequestOptions = {}) {
  return new Requester(options);
}

export const httpRequester = createRequester();

/**
 * 从响应中获取下载文件名
 */
export function getDownloadFileName(response: any) {
  const contentDisposition: string = response.headers['content-disposition'];
  if (!contentDisposition) {
    return '';
  }
  const found = contentDisposition.match(/(filename=(\S+);)|(filename=(\S+)$)/);
  return found ? decodeURIComponent(found[2] || found[4]) : '';
}
