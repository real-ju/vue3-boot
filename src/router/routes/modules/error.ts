import type { RouteRecordRaw } from 'vue-router';

import { asyncViewImport } from '/@/router/helper/routeHelper';

const error: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'error-404',
    meta: {
      title: '404 Not Found',
      public: true
    },
    component: asyncViewImport('error/404.vue')
  }
];

export default error;