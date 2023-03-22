import { ComponentInternalInstance } from 'vue';
export default function useCurrentInstance() {
  const { appContext, vnode } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const funProps: Record<string, Function> = {};
  for (const key in vnode.props) {
    if (key.indexOf('on') === 0 && typeof vnode.props[key] === 'function') {
      funProps[key] = vnode.props[key];
    }
  }
  return {
    proxy,
    funProps
  };
}
