import { httpRequester } from '/@/logics/http';
import { ContentTypeEnum } from '/@/utils/http/enum';

enum Api {
  TEST_API = '/getXXX',
  UPLOAD_API = '/uploadXXX'
}

export const getXXX = (data: any) =>
  httpRequester.post(
    {
      url: Api.TEST_API,
      data
    },
    { auth: false, contentType: ContentTypeEnum.FORM_URLENCODED }
  );

export const uploadXXX = () =>
  httpRequester.uploadFile({
    url: Api.UPLOAD_API,
    name: 'xxx',
    file: new Blob(['1', '2', '3']),
    filename: 'xxx.png',
    data: {
      a: 1,
      b: [2, 3]
    }
  });
