import { asyncViewImport } from '@/config/util';

export default [
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试',
      public: true,
    },
    component: asyncViewImport('test/index.vue'),
  },
  {
    path: '/404',
    name: 'error-404',
    meta: {
      title: '404 Not Found',
      public: true,
    },
    component: asyncViewImport('error/404.vue'),
  },
];
