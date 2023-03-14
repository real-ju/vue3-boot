import { SystemBaseUrl } from '@/store/mutation-types';
export default {
  // layout 的左上角 的 title
  title: 'Vite+Vue3+TS模板',
  // layout 的左上角 logo 的 url
  logo: `${SystemBaseUrl}/images/cattail.png`,
  // 使用 IconFont 的图标配置
  iconfontUrl: 'https://at.alicdn.com/t/c/font_3373343_xic7ab2dkh9.js',
  // layout 的菜单模式，侧边菜单-side，顶部菜单-top，两种混合菜单-mix */
  layout: 'side',
  // 系统主题
  primaryColor: '#4891FF',
  // 顶部菜单主题
  topTheme: '#ffffff',
  // 侧边菜单主题
  sideTheme: '#ffffff',
  // 侧边菜单展开时的宽度
  siderWidth: 140,
  // 侧边菜单收缩时的宽度
  collapsedWidth: 60,
  // 面包屑是否显示
  showBreadcrumb: false,
  // 页签是否显示
  showTabs: true,
  // 色弱模式
  colorWeak: false,
  // 灰色模式
  grayMode: false
};
