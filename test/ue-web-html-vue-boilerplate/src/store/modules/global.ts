import type { PagePaneItem, GlobalState } from '#/store';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { Route } from '@/router/types';

export const useGlobalStore = defineStore({
  id: 'app-global',
  state: (): GlobalState => ({
    // 页面tabs项
    pagePanes: [{ key: '/home', title: '首页' }],
    // 激活项
    pageActiveKey: '/home'
  }),
  getters: {
    getPagePanes(): PagePaneItem[] {
      return this.pagePanes;
    },
    getPageActiveKey(): string {
      return this.pageActiveKey;
    }
  },
  actions: {
    setPagePanes(pagePanes: PagePaneItem[]) {
      this.pagePanes = pagePanes;
    },
    setPageActiveKey(pageActiveKey: string) {
      this.pageActiveKey = pageActiveKey;
    },
    onMenuSelect(payload: RouteLocationNormalizedLoaded) {
      const route = payload as unknown as Route;
      const pagePanes = this.pagePanes;
      const key = route.fullPath;
      const index = pagePanes.findIndex(x => x.key === key);
      if (index === -1) {
        let title = route.meta?.tabTitle?.title ?? route.meta?.title ?? '';
        const queryName: string[] = [];
        if (
          Boolean(route.query) &&
          Boolean(route.meta?.tabTitle?.queryName) &&
          (route.meta?.tabTitle?.queryName ?? []).length > 0
        ) {
          (route.meta?.tabTitle?.queryName ?? []).forEach(item => {
            if (route.query[item] !== null && route.query[item] !== undefined) {
              queryName.push(String(route.query[item]));
            }
          });
        }
        title = title + queryName.join('');
        pagePanes.push({
          key,
          title
        });
        this.pagePanes = pagePanes;
      }
      this.pageActiveKey = key;
    },
    changePageActiveKey(key: string) {
      const pagePanes = this.pagePanes.filter(x => x.key !== key);
      const index = this.pagePanes.findIndex(x => x.key === key);
      let activeKey = '/home';
      if (pagePanes.length > 0) {
        if (index > 0) {
          activeKey = pagePanes[index - 1].key;
        } else {
          activeKey = pagePanes[0].key;
        }
      }
      return activeKey;
    },
    removePagePanes(keys: string[]) {
      const pagePanes = this.pagePanes;
      this.pagePanes = pagePanes.filter(x => keys.findIndex(y => y === x.key) === -1);
    },
    closeOtherPagePanes() {
      const pageActiveKey = this.pageActiveKey;
      const pagePanes = this.pagePanes;
      this.pagePanes = pagePanes.filter(x => x.key === '/home' || x.key === pageActiveKey);
    },
    closeAllPagePanes() {
      this.pageActiveKey = '/home';
      this.pagePanes = [{ key: '/home', title: '首页' }];
    }
  }
});
