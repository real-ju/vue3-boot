import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import { configHtmlPlugin } from './html';

export function createVitePlugins(env: ViteEnv) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue()
  ];

  vitePlugins.push(configHtmlPlugin(env));

  return vitePlugins;
}
