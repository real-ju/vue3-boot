import '/@/design/index.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store';
import { setupRouter } from '/@/router';
import { registerGlobComp } from '/@/components/registerGlobComp';
import { setupGlobDirectives } from '/@/directives';
import { setupLibrary } from '/@/logics/setupLibrary';

function bootstrap() {
  const app = createApp(App);

  setupStore(app);

  setupRouter(app);

  registerGlobComp(app);

  setupGlobDirectives(app);

  setupLibrary(app);

  app.mount('#app');
}

bootstrap();
