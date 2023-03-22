import { store } from '@/store';
import { Router } from '@/router/types';
import type { ApplicationRouter } from '#/store';
import { asyncRouterMap } from '@/config/router.config';
import { useUserStore } from '@/store/modules/user';

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission: string[], route: Router): boolean {
  if (Boolean(route.meta?.permission?.length)) {
    return (route.meta?.permission ?? []).some(s => permission.includes(s));
  }
  return true;
}

// 根据配置的菜单顺序重组
function filterRouterMap(routers: Router[], menus: ApplicationRouter[]) {
  const data = routers;
  for (let i = menus.length - 1; i >= 0; i--) {
    const item = menus[i];
    if (item.appType === 'module' || item.appType === 'menu') {
      const sameData = data.filter(
        x => Boolean(x.meta?.permission?.length) && (x.meta?.permission ?? [])[0] === item.code
      );
      sameData.forEach(r => {
        const index = data.findIndex(x => x.path === r.path);
        if (index >= 0) {
          const route = data[index];
          if (Boolean(item.name)) {
            route.meta = route.meta ?? {};
            route.meta.title = item.name;
          }
          if (Boolean(route.children) && (route.children ?? []).length > 0) {
            route.children = filterRouterMap(route.children ?? [], item.children ?? []);
          }
          data.splice(index, 1);
          data.splice(0, 0, route);
        }
      });
    }
  }
  return data;
}

// 筛选出有权限的路由
function filteRouterPermission(routerMap: Router[], permission: string[]) {
  const accessedRouters: Router[] = [];
  routerMap.forEach(route => {
    if (hasPermission(permission, route)) {
      if ((route.children ?? []).length > 0) {
        route.children = filteRouterPermission(route.children ?? [], permission);
      }
      if ((route.children ?? []).length === 0) {
        delete route.children;
      }
      accessedRouters.push(route);
    }
  });
  return accessedRouters;
}

interface PermissionState {
  showMeunsList: Router[];
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    showMeunsList: []
  }),
  getters: {
    getShowMeunsList(): Router[] {
      return this.showMeunsList;
    }
  },
  actions: {
    setShowMeunsList(showMeunsList: Router[]) {
      this.showMeunsList = showMeunsList;
    },
    generateRoutes(permissions: ApplicationRouter[]) {
      let addRouters: Router[] = filterRouterMap(asyncRouterMap, permissions);
      const userStore = useUserStore();
      addRouters = filteRouterPermission(addRouters, userStore.getMenuPermissions);
      this.setShowMeunsList(addRouters);
      return addRouters;
    }
  }
});
