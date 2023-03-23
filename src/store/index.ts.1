import type { App, InjectionKey } from 'vue';
import type { RootState } from '/#/store';

import { createStore, ModuleTree, Store, useStore as baseUseStore } from 'vuex';
import { resolveFileNameFromPath } from '/@/utils';
import createPersistedState from 'vuex-persistedstate';

// import modules
const modules = import.meta.globEager('./modules/**/*.ts');

const moduleTree: ModuleTree<RootState> = {};

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const fileName = resolveFileNameFromPath(key);
  moduleTree[fileName] = mod;
});

// use plugins
//持久化
const persistedState = createPersistedState({
  paths: ['auth']
});

export const store = createStore<RootState>({
  state: {},
  getters: {
    // name(state, getters) {}
  },
  mutations: {
    // name(state, payload) {}
  },
  actions: {
    // name({ commit }, payload) {}
  },
  modules: moduleTree,
  plugins: [persistedState]
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export function setupStore(app: App) {
  app.use(store, key);
}

export function useStore() {
  return baseUseStore(key);
}
