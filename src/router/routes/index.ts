import type { RouteRecordRaw } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });

const routeRecordList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const module = modules[key] as any;
  const mod = module.default || {};
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
