import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

import 'vue-global-api';
import 'virtual:svg-icons-register';

import { setupStore } from '@/store';
import { setupAnt } from '@/core/lazy_use'; // use lazy load components
import { setupPlugins } from '@/core/plugins';
import { setupGlobDirectives } from '@/core/directives';

import 'ant-design-vue/dist/antd.variable.min.css';
import '@/global/index.less'; // global style

const app = createApp(App);

app.use(router);

setupStore(app);
setupAnt(app);
setupPlugins(app);
setupGlobDirectives(app);

app.mount('#app');

console.log('env:' + 'dev');
console.log('version:' + '0.0.1-build');
