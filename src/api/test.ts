import { httpRequester } from '/@/utils/http/axios';

enum Api {
  TEST_API = '/getXXX'
}

export const getXXX = (data: any) =>
  httpRequester.get(
    {
      url: Api.TEST_API,
      data
    },
    { auth: false }
  );
