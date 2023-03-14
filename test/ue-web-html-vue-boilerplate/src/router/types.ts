import type { LocationQuery, RouteMeta, RouteRecordRedirectOption } from 'vue-router';

// 定义路由结构类型
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface tabTitle {
  /** @title 显示的标题名称 */
  title?: string;
  /** @parameter 从路由query从取出queryName的值拼接在title后面显示 */
  queryName?: string[];
}

export interface RouterMeta extends RouteMeta {
  /** @title 菜单显示的标题 */
  title?: string;
  /** @keepAlive 缓存当前路由 */
  keepAlive?: boolean;
  /** @icon 菜单的icon图标,可使用iconfont图标 */
  icon?: string;
  /** @permission 菜单的权限 */
  permission?: string[];
  /** @tabTitle tab标签的标题 */
  tabTitle?: tabTitle;
  /** @hideInBreadcrumb 在面包屑中隐藏 */
  hideInBreadcrumb?: boolean;
  target?: string;
  blank?: boolean;
}

/** 隐藏菜单时，
 * @hidden 第一优先级
 * @hideChildrenInMenu 第二优先级
 * @flatMenu 第三优先级
 * @hideParentMenu 菜单类型为mix时，才取值，第四优先级
 *  */
export interface Router {
  /** @name 菜单的名字 */
  name?: string;
  /** @path 路径,可以设定为网页链接 */
  path: string;
  /** @component 菜单指向的文件或文件路径 */
  component: Component | string;
  /** @redirect 重定向,可以设定为网页链接 */
  redirect?: RouteRecordRedirectOption;
  /** @meta 附加信息 */
  meta?: RouterMeta;
  /** @children 子菜单 */
  children?: Router[];
  /** @hidden 在菜单中隐藏自己和子菜单 */
  hidden?: boolean;
  /** @hideChildrenInMenu 在菜单中隐藏子菜单 */
  hideChildrenInMenu?: boolean;
  /** @flatMenu 隐藏自己，并且将子菜单提升到与自己平级 */
  flatMenu?: boolean;
  /** @hideParentMenu 隐藏自己，但进入自己路由后右侧仅显示自己的子菜单(只有设置在一级菜单生效) */
  hideParentMenu?: boolean;
}

export interface Route {
  name: string;
  fullPath: string;
  path: string;
  meta?: RouterMeta;
  children?: Route[];
  hidden?: boolean;
  hideChildrenInMenu?: boolean;
  flatMenu?: boolean;
  hideParentMenu?: boolean;
  query: LocationQuery;
}

export interface MenuItem {
  path: string;
  meta?: RouterMeta;
  children?: MenuItem[];
  hideParentMenu?: boolean;
}
