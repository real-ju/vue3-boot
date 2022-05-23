import type { Router, RouteRecordRaw } from 'vue-router';

import {
  routePathToName,
  setPageTitle,
  getComponentFilePath
} from '/@/router/helper/routeHelper';
import { asyncViewImport } from '/@/router/helper/asyncViewImport';
import projectSetting from '/@/settings/projectSetting';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';

export function createSafetyPermissionGuard(router: Router) {
  let isFetchUserRoutes = false;

  router.beforeEach((to, from, next) => {
    let isLogin = store.getters['auth/isLogin'];
    if (isLogin) {
      if (!isFetchUserRoutes) {
        // 此处为获取用户路由表的接口
        Promise.resolve()
          .then((res: any) => {
            let datas = res.data;
            let routeList: RouteRecordRaw[] = [];
            let adminRoutes: RouteRecordRaw[] = [];

            let { multiplePlatformMode } = projectSetting;
            let userPlatform = store.getters['auth/user'].platform;
            if (multiplePlatformMode && !userPlatform) {
              store.commit('auth/logout');
              router.push(PageEnum.LOGIN);
              throw '登陆状态错误，请重新登陆';
            }

            // 添加所有admin route
            datas.forEach((item: any) => {
              adminRoutes.push({
                path: item.route,
                name: 'admin-' + routePathToName(item.route),
                meta: {
                  title: item.title,
                  public: false
                },
                component: asyncViewImport(
                  getComponentFilePath(
                    item.url,
                    multiplePlatformMode,
                    item.common,
                    userPlatform.symbol
                  )
                )
              });
            });

            routeList.push({
              path: '/',
              redirect: '/admin'
            });

            routeList.push({
              path: '/admin',
              name: 'admin',
              meta: {
                title: 'Layout',
                public: false
              },
              component: asyncViewImport('admin/index.vue'),
              children: adminRoutes
            });

            routeList.push({
              path: '*',
              redirect: PageEnum.ERROR_404
            });

            routeList.forEach((record) => {
              router.addRoute(record);
            });

            isFetchUserRoutes = true;

            next(to);
          })
          .catch((res) => {
            let error = new Error('路由表获取失败');
            next(error);
          });
      } else if (to.path === PageEnum.LOGIN) {
        next('/');
      } else {
        setPageTitle(to.meta.title);
        next();
      }
    } else {
      let isMatched = to.matched.length != 0;

      if (isMatched) {
        if (!to.meta.public) {
          next({
            path: PageEnum.LOGIN,
            query: {
              back_url: encodeURIComponent(to.fullPath)
            }
          });
        } else {
          setPageTitle(to.meta.title);
          next();
        }
      } else {
        next(PageEnum.LOGIN);
      }
    }
  });

  router.onError((error) => {
    router.push(PageEnum.ERROR_403);
  });
}
