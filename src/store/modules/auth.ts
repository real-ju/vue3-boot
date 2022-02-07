import type { Module } from 'vuex';
import type { AuthState, RootState } from '/#/store';

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: (): AuthState => ({
    isLogin: false,
    user: null,
    token: null
  }),
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    user(state) {
      return state.user || {};
    },
    token(state) {
      return state.token || '';
    }
  },
  mutations: {
    login(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLogin = true;
    },
    logout(state, payload) {
      state.user = null;
      state.token = '';
      state.isLogin = false;
    }
  },
  actions: {}
};

export default auth;
