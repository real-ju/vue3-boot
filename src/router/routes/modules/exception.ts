import type { RouteRecordRaw } from 'vue-router';

const error: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'exception-404',
    meta: {
      title: '404 Not Found',
      public: true,
      hideTitleSuffix: true
    },
    component: () => import('../../../views/exception/index.vue'),
    props: { code: 404 }
  }
];

export default error;
