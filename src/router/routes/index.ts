import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeRecordList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeRecordList.push(...modList);
});

export default routeRecordList;
