import Vue from 'vue';
import Router from 'vue-router';
import routes from './reg';
import store from '../store';

Vue.use(Router);

const APP_NAME = process.env.VUE_APP_appName;

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 };
    if (to.hash) {
      position.selector = to.hash;
    }

    return position;
  }
});

router.beforeEach((to, from, next) => {
  // 检测是否匹配某路由
  let isMatched = to.matched.length !== 0;
  if (!isMatched) {
    let error = new Error(`'${to.path}'不是有效路径`);
    error.name = 'PathMatchError';
    next(error);
  } else {
    let isLogin = store.getters['auth/isLogin'];
    // 检测路由访问权限
    let requireAuth = to.matched.some((record) => !record.meta.public);
    if (requireAuth) {
      // 检测是否登录
      if (isLogin) {
        document.title = `${to.meta.title} - ${APP_NAME}`;
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
        document.title = `${to.meta.title} - ${APP_NAME}`;
        next();
      }
    }
  }
});

router.onError(function (error) {
  if (error.name === 'PathMatchError') {
    router.push('/');
  } else if (error.name === 'PathAuthError') {
    router.push('/');
  }
});

export default router;
