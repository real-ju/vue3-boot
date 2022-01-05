import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { setupRouterGuard } from './guard';

// router instance
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return {
        top: 0,
        left: 0
      };
    }
  }
});

// config router
export function setupRouter(app: App<Element>) {
  setupRouterGuard(router);
  app.use(router);
}
