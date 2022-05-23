import type { RouteRecordRaw } from 'vue-router';

import { asyncViewImport } from '/@/router/helper/asyncViewImport';

const error: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'error-404',
    meta: {
      title: '404 Not Found',
      public: true,
      hideTitleSuffix: true
    },
    component: asyncViewImport('error/404/index.vue')
  }
];

export default error;
