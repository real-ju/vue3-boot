import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { constantRouterMap } from '@/config/router.config';
import { setupBeforeEach, setupAfterEach } from './routerGuard';
import { SystemBaseUrl } from '@/store/mutation-types';

const router = createRouter({
  // 路由history模式
  history: createWebHistory(`${SystemBaseUrl}/`),
  routes: constantRouterMap as unknown as RouteRecordRaw[]
});

// 路由守卫,鉴权
setupBeforeEach(router);

setupAfterEach(router);

export default router;
