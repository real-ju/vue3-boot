import html from 'vite-plugin-html';
import type { Plugin } from 'vite';

export function configHtmlPlugin(env: ViteEnv) {
  const htmlPlugin: Plugin[] = html({
    inject: {
      data: {
        title: env.VITE_APP_TITLE
      }
    }
  });

  return htmlPlugin;
}
