import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
// import { resolve } from 'path';
import { createVitePlugins } from './build/vite/plugin';
import { wrapEnv, pathResolve } from './build/utils';

// function pathResolve(dir: string) {
//   return resolve(process.cwd(), dir);
// }

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapEnv(env);

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // /@/xxxx => /src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => /types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    plugins: createVitePlugins(viteEnv),
    server: {
      host: true,
      proxy: {
        '/api': {
          target: viteEnv.VITE_DEV_SERVER_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      'process.env.VITE_ENV': viteEnv
    },
    build: {
      sourcemap: mode === 'development'
    }
  };
};
