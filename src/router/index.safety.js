import Vue from 'vue';
import Router from 'vue-router';
import routes from './reg';
import store from '../store';
import Api from '@/lib/api/reg';
import { asyncViewImport } from '@/config/util';

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
  },
});

let isFetchUserRoutes = false;

router.beforeEach((to, from, next) => {
  let isLogin = store.getters['auth/isLogin'];
  if (isLogin) {
    if (!isFetchUserRoutes) {
      Api.route
        .get()
        .then((res) => {
          let datas = res.data;
          let routeList = [];
          let adminRoutes = [];

          let userPlatform = store.getters['auth/user'].platform;
          if (!userPlatform) {
            throw '登陆状态错误，请重新登陆';
          }

          // 添加所有的route
          datas.forEach((item) => {
            adminRoutes.push({
              path: item.route,
              name: item.name,
              meta: {
                title: item.title,
                public: false,
              },
              component: asyncViewImport(
                `admin/${item.common ? 'common' : userPlatform.symbol}/${item.name
                }/index.vue`
              ),
            });
          });

          routeList.push({
            path: '/',
            redirect: '/admin',
          });

          routeList.push({
            path: '/admin',
            name: 'admin',
            meta: {
              title: '首页',
              public: false,
            },
            component: asyncViewImport('admin/index.vue'),
            children: adminRoutes,
          });

          routeList.push({
            path: '*',
            redirect: '/404',
          });

          router.addRoutes(routeList);

          isFetchUserRoutes = true;

          next(to);
        })
        .catch((error) => {
          console.dir(error);
          // next('/404');
        });
    } else if (to.path === '/login') {
      next('/');
    } else {
      document.title = `${to.meta.title} - ${APP_NAME}`;
      next();
    }
  } else {
    let isMatched = to.matched.length != 0;

    if (isMatched) {
      if (!to.meta.public) {
        next({
          path: '/login',
          query: {
            back_url: encodeURIComponent(to.fullPath),
          },
        });
      } else {
        document.title = `${to.meta.title} - ${APP_NAME}`;
        next();
      }
    } else {
      next('/login');
    }
  }
});

router.onError(function (error) {
  router.push('/404');
});

export default router;
