import type { App } from 'vue';

import { SvgIcon } from './index';

export function registerGlobComp(app: App) {
  // common components register
  app.component('SvgIcon', SvgIcon);
}
