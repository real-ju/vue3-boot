import type { App } from 'vue';
import VueWebStorage from 'vue-web-storage';

export function setupWebStorage(app: App) {
  const VITE_APP_ID = import.meta.env.VITE_APP_ID;
  app.use(VueWebStorage, { prefix: `${VITE_APP_ID}_` });
}
