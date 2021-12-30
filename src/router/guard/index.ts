import type { Router } from 'vue-router';

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
}

function createPermissionGuard(router: Router) {}
