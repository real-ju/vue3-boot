import type { RouteRecordRaw } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeRecordList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeRecordList.push(...modList);
});

const rootRoute: RouteRecordRaw = {
  path: '/',
  name: 'root',
  redirect: PageEnum.HOME,
  meta: {
    title: 'Root',
    public: true
  }
};

export default [rootRoute, ...routeRecordList];
