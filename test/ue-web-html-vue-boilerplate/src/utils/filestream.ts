import { message } from 'ant-design-vue';
import { httpRequest } from '@/utils/request';

export default (data: Record<string, any>) => {
  const { url, method, fileName, isPrint } = data;
  const requestData: Record<string, any> = {
    url,
    method: method ?? 'post',
    responseType: 'blob'
  };

  if (Boolean(data.data)) {
    requestData.data = data.data;
  }

  if (Boolean(data.params)) {
    requestData.params = data.params;
  }

  httpRequest(requestData)
    .then(res => {
      if (Boolean(res) && Boolean(res.headers)) {
        if (Boolean(isPrint)) {
          if (Boolean(res.headers.fileurl)) {
            window.open(res.headers.fileurl);
          } else if (Boolean(res.data)) {
            window.open(window.URL.createObjectURL(res.data));
          } else {
            void message.error('操作失败');
          }
        } else {
          if (Boolean(res.headers.filename) || Boolean(fileName)) {
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(res.data);
            a.download = Boolean(res.headers.filename) ? window.decodeURI(res.headers.filename) : fileName;
            a.click();
            a.remove();
          } else {
            void message.error('下载文件失败！');
          }
        }
      } else {
        void message.error(Boolean(isPrint) ? '操作失败' : '下载文件失败！');
      }
    })
    .catch(_error => {
      void message.error(Boolean(isPrint) ? '操作失败' : '下载文件失败！');
    });
};
