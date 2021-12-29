import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string): string {
  return resolve(process.cwd(), dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // @/xxxx => /src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        }
      ]
    },
    plugins: [vue()],
    server: {
      // host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_DEV_SERVER_PROXY,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
};
