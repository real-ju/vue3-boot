import type { Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import '@/components/NProgress/nprogress.less'; // progress bar custom style
import { notification } from 'ant-design-vue';
import { setDocumentTitle, domTitle } from '@/utils/domUtil';
import { storageItem } from '@/utils/session';
import { Authorization, SystemPlatCode } from '@/store/mutation-types';
import { useUserStore } from '@/store/modules/user';
import { usePermissionStore } from '@/store/modules/permission';
import type { ApplicationRouter } from '#/store';
import { asyncRouterMap } from '@/config/router.config';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 路由白名单，不进行拦截的路由名称集合
const allowList = ['/user/login', '/sso/login', '/exception/403', '/exception/404', '/exception/500'];
const loginRoutePath = '/user/login';
const defaultRoutePath = '/home';

// 路由守卫
export const setupBeforeEach = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start(); // 加载进度条
    if (Boolean(to.meta) && Boolean(to.meta.title)) {
      setDocumentTitle(`${String(to.meta.title)} - ${domTitle}`);
    }
    if (allowList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next();
    } else if (Boolean(storageItem.getItem(Authorization))) {
      const userStore = useUserStore();
      const permissionStore = usePermissionStore();
      const accountInfo = userStore.getAccountInfo;
      if (!Boolean(accountInfo) || JSON.stringify(accountInfo) === '{}') {
        // request login userInfo
        userStore
          .getInfo()
          .then(res => {
            const roles = res.data;
            const applications =
              (roles.applications ?? []).filter((x: ApplicationRouter) => x.code === SystemPlatCode)[0]?.children ?? [];
            const addRouters = permissionStore.generateRoutes(applications);
            // 根据role权限生成可访问的路由表
            // 动态添加可访问路由表
            addRouters.forEach(itemRouters => {
              if (itemRouters.name === 'Redirect') {
                router.addRoute(itemRouters as RouteRecordRaw);
              } else {
                router.addRoute('HomeMain', itemRouters as RouteRecordRaw);
              }
            });
            // // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent((from.query.redirect ?? to.path) as string);
            // 获取用户角色
            void userStore.getUserRoleInfo(roles.user.id).then(userRoleInfoRes => {
              userStore.setUserRoles(userRoleInfoRes.data ?? []);
            });
            if (to.path === redirect) {
              // set the replace: true so the navigation will not leave a history record
              if (redirect === '/') {
                if (addRouters.length > 0) {
                  next({ path: addRouters[0].path ?? defaultRoutePath });
                } else {
                  next({ ...to, replace: true });
                }
              } else {
                next({ ...to, replace: true });
              }
            } else {
              // 跳转到目的路由
              next({ path: redirect });
            }
          })
          .catch(() => {
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            next({ path: loginRoutePath, query: { redirect: to.fullPath } });
          });
      } else {
        next();
      }
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  });
};

export const setupAfterEach = (router: Router) => {
  router.afterEach(() => {
    NProgress.done(); // finish progress bar
  });
};

// // 抓取路由错误，刷新界面
// export const setupOnError = (router: Router) => {
//   router.onError((error) => {
//     const pattern = /Loading chunk (\d)+ failed/g
//     const isChunkLoadFailed = error.message.match(pattern)
//     const targetPath = router.history.pending.fullPath
//     if (isChunkLoadFailed) {
//       router.replace(targetPath)
//     }
//   })
// }
