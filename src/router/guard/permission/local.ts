import type { Router } from 'vue-router';

import { setDocTitle } from '/@/utils/dom';

const APP_TITLE = import.meta.env.VITE_APP_TITLE;

export function createLocalPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 检测是否匹配某路由
    let isMatched = to.matched.length !== 0;
    if (!isMatched) {
      let error = new Error(`'${to.path}'不是有效路径`);
      error.name = 'PathMatchError';
      next(error);
    } else {
      // let isLogin = store.getters['auth/isLogin'];
      let isLogin = false;
      // 检测路由访问权限
      let requireAuth = to.matched.some((record) => !record.meta.public);
      if (requireAuth) {
        // 检测是否登录
        if (isLogin) {
          setDocTitle(`${to.meta.title} - ${APP_TITLE}`);
          next();
        } else {
          next({
            path: '/login',
            query: {
              back_url: from.name === null ? to.fullPath : from.fullPath
            }
          });
        }
      } else {
        // 登录后再次访问登录页
        if (to.path === '/login' && isLogin) {
          next({ path: '/' });
        } else {
          setDocTitle(`${to.meta.title} - ${APP_TITLE}`);
          next();
        }
      }
    }
  });

  router.onError((error) => {
    if (error.name === 'PathMatchError') {
      router.push('/');
    } else if (error.name === 'PathAuthError') {
      router.push('/');
    }
  });
}
