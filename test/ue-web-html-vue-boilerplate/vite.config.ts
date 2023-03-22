import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import eslint from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    Components({
      dirs: ['src/components'], // 目标文件夹
      extensions: ['vue', 'jsx'], // 文件类型
      dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
      // ui库解析器，也可以自定义，需要安装相关UI库
      resolvers: [AntDesignVueResolver({ importStyle: false })]
      // resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', { '@vueuse/core': ['useFullscreen'] }],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // Specify symbolId format
      symbolId: 'svg-[dir]-[name]'
    }),
    eslint(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Vite+Vue3+TS模板'
        }
      }
    })
  ],
  // base: './', // 类似publicPath，'./'避免打包访问后空白页面，要加上，不然线上也访问不了
  base: '/demo/',
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`
        // replacement: resolve(_dirname, 'src')`
      },
      // #/xxxx => types/xxxx
      {
        find: /#\//,
        replacement: `${pathResolve('types')}/`
      }
    ]
  },
  build: {
    // 打包时先清空上一次构建生成的目录
    emptyOutDir: true,
    minify: 'terser',
    outDir: 'build/dist/demo',
    // assetsDir: 'assets',//指定静态资源存放路径
    sourcemap: process.env.NODE_ENV !== 'production', // 是否构建source map 文件
    terserOptions: {
      // 生产环境移除console、debugger
      compress: {
        // drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    https: false, // 是否开启 https
    // Listening on all local IPs
    open: false, // 是否自动在浏览器打开
    host: true,
    port: 15717, // 端口号
    // Load proxy configuration from .env
    proxy: {
      '/api': {
        target: 'http://app.io.superlucy.net', // 后台接口
        changeOrigin: true, // 是否跨域
        // secure: false,// 如果是https接口，需要配置这个参数
        ws: false // websocket支持
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/global/theme.less')}";`
          // hack: `true; @import 'ant-design-vue/lib/style/themes/default.less'`
          // '@basic-layout-sider-bg': '#fff7e6', // 侧边栏背景色
          // '@basic-layout-sider-sub-bg': '#ffe7ba', // 侧边栏展开背景色
          // '@basic-layout-header-bg': '#bae0ff', // 顶部栏背景色
          // '@basic-layout-header-sub-bg': '#1677ff' // 顶部栏展开背景色
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      '@ant-design/colors',
      '@ant-design/icons-vue',
      '@vueuse/components',
      '@vueuse/core',
      'ant-design-vue',
      'ant-design-vue/es/locale/zh_CN',
      'axios',
      'echarts',
      // "echarts/charts",
      // "echarts/components",
      // "echarts/core",
      // "echarts/renderers",
      'jquery',
      'jsencrypt',
      'moment',
      'nprogress',
      'number-precision',
      'pinia',
      'store2',
      'vue',
      'vue-clipboard3',
      // "vue-echarts",
      'vue-router'
    ]
  }
});
