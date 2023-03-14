import type { App, Directive, DirectiveBinding } from 'vue';
import { useUserStore } from '@/store/modules/user';

function handleAuth(permissions: string | string[]) {
  const userStore = useUserStore();

  const actionList = userStore.getActionPermissions ?? [];

  if (!Boolean(permissions)) {
    return true;
  } else if (Array.isArray(permissions) && permissions.length > 0) {
    return permissions.every(val => actionList.includes(val));
  } else if (typeof permissions === 'string') {
    return actionList.includes(permissions);
  } else {
    return false;
  }
}

function checkPermission(el: Element, binding: DirectiveBinding<string | string[]>) {
  const value = binding.value;
  const hasPermission = handleAuth(value);
  if (!hasPermission) {
    el.parentNode?.removeChild(el);
  }
}

const permissionDirective: Directive = {
  mounted(el: Element, binding: DirectiveBinding<string | string[]>) {
    checkPermission(el, binding);
  },
  updated(el: Element, binding: DirectiveBinding<string | string[]>) {
    checkPermission(el, binding);
  }
};

export function setupPermissionDirective(app: App<Element>) {
  app.directive('permission', permissionDirective);
  app.config.globalProperties.$auth = handleAuth;
}
