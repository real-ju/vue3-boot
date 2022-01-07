import projectSetting from '/@/settings/projectSetting';
import { setDocTitle } from '../../utils/domUtils';

/**
 * 异步导入页面级组件
 * @param {String} url 相对于/src/views文件夹的路径
 */
export function asyncViewImport(url: string) {
  return () => import(/* @vite-ignore */ '/@/views/' + url);
}

/**
 * 相对url转化为路由记录name
 */
export function routePathToName(url: string) {
  return url.split('/').join('-');
}

/**
 * 设置页面标题
 */
export function setPageTitle(title: string) {
  if (projectSetting.showPageTitleSuffix) {
    const APP_TITLE = import.meta.env.VITE_APP_TITLE;
    title += ` - ${APP_TITLE}`;
  }
  setDocTitle(title);
}

/**
 * 获取组件路径
 * 文件夹路径说明：'admin/' + 平台名（平台通用为common） + 组件相对路径，单平台模式下没有平台名这一层级
 * @param path 组件相对路径
 * @param multiplePlatformMode 多平台模式
 * @param isCommon 是否通用平台路由
 * @param platform 平台名
 */
export function getComponentFilePath(
  path: string,
  multiplePlatformMode: boolean = false,
  isCommon: boolean = false,
  platform: string = ''
) {
  let filePath: string = path + '.vue';
  if (multiplePlatformMode) {
    if (isCommon) {
      filePath = 'common/' + filePath;
    } else {
      filePath = platform + '/' + filePath;
    }
  }
  filePath = 'admin/' + filePath;

  return filePath;
}
