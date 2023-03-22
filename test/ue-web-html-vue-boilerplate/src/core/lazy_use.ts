import { App, createVNode } from 'vue';
import defaultSettings from '@/config/defaultSettings';
// // base library
import { Modal, message, notification, ConfigProvider } from 'ant-design-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import * as Icons from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl
});

const AntIcon = (props: { type: string }) => {
  const { type } = props;
  if (/^icon-/.test(type)) {
    return createVNode(IconFont, { type });
  }
  const antIcon: Record<string, any> = Icons;
  return createVNode(antIcon[type]);
};

export function setupAnt(app: App<Element>) {
  // // iconfont图标
  // app.component('IconFont', IconFont);

  // icon图标
  app.component('AntIcon', AntIcon);

  app.config.globalProperties.$confirm = Modal.confirm;
  app.config.globalProperties.$info = Modal.info;
  app.config.globalProperties.$success = Modal.success;
  app.config.globalProperties.$error = Modal.error;
  app.config.globalProperties.$warning = Modal.warning;
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$notification = notification;
  app.config.globalProperties.$configProvider = ConfigProvider;
}

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.');
