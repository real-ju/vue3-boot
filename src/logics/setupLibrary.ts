import type { App } from 'vue';
import { setupWebStorage } from './lib/vue-web-storage';

export function setupLibrary(app: App) {
  setupWebStorage(app);
}
