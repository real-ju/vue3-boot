import type { RouteRecordRaw } from 'vue-router';

const test: RouteRecordRaw = {
  path: '/test',
  name: 'test',
  meta: {
    title: '测试',
    public: true
  },
  component: () => import('../../../views/test/index.vue')
};

export default test;
