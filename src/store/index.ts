import type { App } from 'vue';
import type { RootState } from '/#/store';

import { createStore, ModuleTree } from 'vuex';
import { resolveFileNameFromPath } from './helper';
// import createPersistedState from 'vuex-persistedstate';

// import modules
const modules = import.meta.globEager('./modules/**/*.ts');

const moduleTree: ModuleTree<RootState> = {};

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const fileName = resolveFileNameFromPath(key);
  moduleTree[fileName] = mod;
});

// use plugins
// const PersistedState = createPersistedState({
//   paths: ['auth']
// });

const store = createStore({
  state: (): RootState => ({}),
  getters: {
    // name(state, getters): any {}
  },
  mutations: {
    // name(state, payload): void {}
  },
  actions: {
    // name({ commit }, payload): void {}
  },
  modules: moduleTree
  // plugins: [PersistedState]
});

export function setupStore(app: App<Element>) {
  app.use(store);
}
