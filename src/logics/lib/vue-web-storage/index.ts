import type { App } from 'vue';

import VueWebStorage from 'vue-web-storage';
import { getEnv } from '/@/utils/env';

export function setupWebStorage(app: App) {
  const VITE_APP_ID = getEnv().VITE_APP_ID;
  app.use(VueWebStorage, { prefix: `${VITE_APP_ID}_` });
}
