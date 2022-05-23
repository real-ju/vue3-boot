import type { Router } from 'vue-router';

import { setPageTitle } from '/@/router/helper/routeHelper';
import { store } from '/@/store';
import { PageEnum } from '/@/enums/pageEnum';

export function createLocalPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 检测是否匹配某路由
    let isMatched = to.matched.length !== 0;
    if (!isMatched) {
      let error = new Error(`"${to.path}"不是有效路径`);
      error.name = 'PathMatchError';
      next(error);
    } else {
      let isLogin = store.getters['auth/isLogin'];
      // 检测路由访问权限
      let requireAuth = to.matched.some((record) => !record.meta.public);
      if (requireAuth) {
        // 检测是否登录
        if (isLogin) {
          setPageTitle(to.meta.title, to.meta.hideTitleSuffix);
          next();
        } else {
          next({
            path: PageEnum.LOGIN,
            query: {
              back_url: from.name === null ? to.fullPath : from.fullPath
            }
          });
        }
      } else {
        // 登录后再次访问登录页
        if (to.path === PageEnum.LOGIN && isLogin) {
          next('/');
        } else {
          setPageTitle(to.meta.title, to.meta.hideTitleSuffix);
          next();
        }
      }
    }
  });

  router.onError((error) => {
    if (error.name === 'PathMatchError') {
      // 如果不存在/404 会导致死循环 浏览器卡死
      router.push(PageEnum.ERROR_404);
    } else if (error.name === 'PathAuthError') {
      router.push(PageEnum.ERROR_403);
    }
  });
}
