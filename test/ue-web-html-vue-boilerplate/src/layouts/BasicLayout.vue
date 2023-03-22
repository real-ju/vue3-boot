<template>
  <a-layout class="basic-layout">
    <a-layout-header class="basic-layout-header">
      <div class="basic-layout-header-logo">
        <router-link to="/">
          <img class="basic-layout-header-logo-img" :src="settings.logo" />
          <h1 class="basic-layout-header-logo-title">{{ settings.title }}</h1>
        </router-link>
      </div>
      <div class="basic-layout-header-fold" v-show="showMenus.sideMenuList.length">
        <svg-icon :name="settings.collapsed ? 'svg-menu-unfold' : 'svg-menu-fold'" @click="handleCollapse" />
      </div>
      <div class="basic-layout-header-menu">
        <header-menu
          :settings="settings"
          :menuKeys="menuKeys"
          :showMenus="showMenus"
          v-show="settings.layout !== 'side' && showMenus.topMenuList.length > 0"
        />
        <a-breadcrumb :routes="breadcrumb" v-show="settings.layout === 'side' && settings.showBreadcrumb">
          <template #itemRender="{ route, params, routes }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              <template v-if="route.breadcrumbIcon">
                <svg-icon v-if="/^svg-/.test(route.breadcrumbIcon)" :name="route.breadcrumbIcon" />
                <ant-icon v-else :type="route.breadcrumbIcon" />
              </template>
              {{ route.breadcrumbName }}
            </span>
            <router-link v-else :to="{ path: route.path, params }">
              <template v-if="route.breadcrumbIcon">
                <svg-icon v-if="/^svg-/.test(route.breadcrumbIcon)" :name="route.breadcrumbIcon" />
                <ant-icon v-else :type="route.breadcrumbIcon" />
              </template>
              {{ route.breadcrumbName }}
            </router-link>
          </template>
        </a-breadcrumb>
      </div>
      <div style="display: flex">
        <right-content :settings="settings" @update-setting="updateSetting" />
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        class="basic-layout-sider"
        v-model:collapsed="settings.collapsed"
        theme="light"
        collapsible
        :collapsedWidth="settings.collapsedWidth"
        :width="showMenus.sideMenuList.length ? settings.siderWidth : 0"
        :trigger="null"
      >
        <!-- <template #trigger>
          <ant-icon type="RightOutlined" />
        </template> -->
        <sider-menu :settings="settings" :menuKeys="menuKeys" :showMenus="showMenus" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="basic-layout-content">
          <UseFullscreen v-slot="{ enter, exit }">
            <div v-show="settings.layout !== 'side' && settings.showBreadcrumb">
              <a-breadcrumb :routes="breadcrumb">
                <template #itemRender="{ route, params, routes }">
                  <span v-if="routes.indexOf(route) === routes.length - 1">
                    <template v-if="route.breadcrumbIcon">
                      <svg-icon v-if="/^svg-/.test(route.breadcrumbIcon)" :name="route.breadcrumbIcon" />
                      <ant-icon v-else :type="route.breadcrumbIcon" />
                    </template>
                    {{ route.breadcrumbName }}
                  </span>
                  <router-link v-else :to="{ path: route.path, params }">
                    <template v-if="route.breadcrumbIcon">
                      <svg-icon v-if="/^svg-/.test(route.breadcrumbIcon)" :name="route.breadcrumbIcon" />
                      <ant-icon v-else :type="route.breadcrumbIcon" />
                    </template>
                    {{ route.breadcrumbName }}
                  </router-link>
                </template>
              </a-breadcrumb>
            </div>
            <div class="page-menu-tabs" v-show="settings.showTabs">
              <a-tabs
                v-model:activeKey="pageActiveKey"
                hide-add
                type="editable-card"
                @change="onTabsChange"
                @edit="onTabsEdit"
              >
                <a-tab-pane
                  v-for="pane in pagePanes"
                  :key="pane.key"
                  :tab="pane.title"
                  :closable="pane.key !== '/home' && pagePanes.length > 1"
                />
                <template #rightExtra>
                  <a-button @click="pageRedo">
                    <svg-icon name="svg-redo" />
                  </a-button>
                  <a-dropdown>
                    <a-button>
                      <svg-icon name="svg-arrow-down" />
                    </a-button>
                    <template #overlay>
                      <a-menu class="dropdown-menu-style">
                        <a-menu-item
                          key="1"
                          @click="pagePanes.length === 1 ? null : onTabsEdit(pageActiveKey, 'remove')"
                        >
                          关闭当前选项卡
                        </a-menu-item>
                        <a-menu-item
                          key="2"
                          @click="pagePanes.length === 1 ? null : onTabsEdit(pageActiveKey, 'other')"
                        >
                          关闭其他选项卡
                        </a-menu-item>
                        <a-menu-item key="3" @click="onTabsEdit(pageActiveKey, 'all')">关闭全部选项卡</a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                  <a-button @click="pageFullToggle(enter, exit)">
                    <svg-icon :name="isPageFullscreen ? 'svg-fullscreen-exit-main' : 'svg-fullscreen-main'" />
                  </a-button>
                </template>
              </a-tabs>
            </div>
            <div class="basic-layout-content-page">
              <div style="min-width: 992px; height: 100%">
                <route-view v-if="isRouterActive" />
              </div>
            </div>
          </UseFullscreen>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { Router, MenuItem } from '@/router/types';
  import { UseFullscreen } from '@vueuse/components';
  import defaultSettings from '@/config/defaultSettings';
  import { useGlobalStore } from '@/store/modules/global';
  import { usePermissionStore } from '@/store/modules/permission';
  import { toggleClass, setCssVar } from '@/utils/util';
  import { ConfigProvider } from 'ant-design-vue';
  import { generate } from '@ant-design/colors';
  import { RouteView } from '@/layouts';

  const router = useRouter();
  const globalStore = useGlobalStore();
  const permissionStore = usePermissionStore();
  const menuData = permissionStore.getShowMeunsList;

  const settings = reactive<Record<string, any>>({
    ...defaultSettings,
    // 控制菜单的收起和展开
    collapsed: false,
    menuList: menuData
  });

  const menuKeys = reactive<{
    selectedTopKeys: string[];
    selectedSiderKeys: string[];
    openKeys: string[];
  }>({
    selectedTopKeys: [],
    selectedSiderKeys: [],
    openKeys: []
  });

  // 面包屑显示
  const breadcrumb = computed(() => {
    const breadcrumbData: any[] = [];
    router.currentRoute.value.matched.concat().forEach(item => {
      if (item.meta?.hideInBreadcrumb !== false) {
        breadcrumbData.push({
          path: item.path,
          breadcrumbName: item.meta?.title ?? '',
          breadcrumbIcon: item.meta?.icon ?? ''
        });
      }
    });
    return breadcrumbData;
  });

  const getMenuItem = (list: Router[]) => {
    const data: MenuItem[] = [];
    list.forEach(item => {
      if (item.hidden !== true) {
        let children: MenuItem[] = [];
        if (item.children && item.children.length) {
          children = getMenuItem(item.children);
        }
        if (children.length === 0 || item.hideChildrenInMenu === true) {
          data.push({
            path: item.path,
            meta: { ...item.meta }
          });
        } else if (item.flatMenu === true) {
          data.push(...children);
        } else {
          data.push({
            path: item.path,
            meta: { ...item.meta },
            children,
            hideParentMenu: item.hideParentMenu
          });
        }
      }
    });
    return data;
  };

  // 菜单显示
  const showMenus = computed(() => {
    let topMenuList: MenuItem[] = [];
    let sideMenuList: MenuItem[] = [];
    const menus = getMenuItem(menuData);
    if (settings.layout === 'side') {
      sideMenuList = menus.filter(x => x.hideParentMenu !== true);
    } else if (settings.layout === 'top') {
      topMenuList = menus.filter(x => x.hideParentMenu !== true);
    } else {
      topMenuList = menus.filter(x => x.hideParentMenu !== true).map(x => ({ path: x.path, meta: { ...x.meta } }));
      sideMenuList = menus.filter(x => menuKeys.selectedTopKeys.includes(x.path))[0]?.children ?? [];
    }
    return {
      topMenuList,
      sideMenuList
    };
  });

  // 侧边栏菜单展开/收起
  const handleCollapse = () => {
    settings.collapsed = !settings.collapsed;
  };

  watchEffect(() => {
    if (router.currentRoute) {
      const matched = router.currentRoute.value.matched.concat();
      menuKeys.selectedTopKeys = matched
        .filter(r => r.name !== 'HomeMain' && !Boolean(r.meta?.target))
        .map(r => r.path);
      menuKeys.selectedSiderKeys = matched
        .filter(r => r.name !== 'HomeMain' && !Boolean(r.meta?.target))
        .map(r => r.path);
      menuKeys.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path);
    }
  });

  // 更新设置
  const updateSetting = (type: string, value: any) => {
    if (type === 'reset') {
      for (const key in value) {
        settings[key] = value[key];
      }
    } else {
      settings[type] = value;
    }
    if (type === 'colorWeak' || type === 'grayMode') {
      toggleClass(value, type, document.documentElement);
    } else if (type === 'primaryColor') {
      ConfigProvider.config({
        theme: {
          primaryColor: value
          // errorColor: '#ff4d4f',
          // warningColor: '#faad14',
          // successColor: '#52c41a',
          // infoColor: '#1890ff',
          // processingColor?: string;
        }
      });
    } else if (type === 'topTheme') {
      const colors = generate(value);
      let index = colors.findIndex(x => x.toLowerCase() === value.toLowerCase());
      index = index < 1 ? 1 : index;
      setCssVar('--header-bg-color', colors[index]);
      setCssVar('--header-bg-sub-color', colors[index - 1]);
    } else if (type === 'sideTheme') {
      const colors = generate(value);
      let index = colors.findIndex(x => x.toLowerCase() === value.toLowerCase());
      index = index < 1 ? 1 : index;
      setCssVar('--sider-bg-color', colors[index - 1]);
      setCssVar('--sider-bg-sub-color', colors[index]);
    }
  };

  const pageActiveKey = computed(() => globalStore.getPageActiveKey);
  const pagePanes = computed(() => globalStore.getPagePanes);
  // // tabs切换
  const onTabsChange = (pageActiveKey: string) => {
    router.push({ path: pageActiveKey });
    globalStore.setPageActiveKey(pageActiveKey);
  };
  // 新增和删除页签的回调
  const onTabsEdit = (targetKey: string, action: string) => {
    if (action === 'remove') {
      if (pageActiveKey.value === targetKey) {
        const activeKey = globalStore.changePageActiveKey(targetKey);
        onTabsChange(activeKey);
      }
      globalStore.removePagePanes([targetKey]);
    } else if (action === 'other') {
      globalStore.closeOtherPagePanes();
    } else if (action === 'all') {
      globalStore.closeAllPagePanes();
      router.push({ path: '/home' });
    }
  };

  const isRouterActive = ref(true);
  const pageRedo = () => {
    isRouterActive.value = false;
    nextTick(() => {
      isRouterActive.value = true;
    });
  };

  const isPageFullscreen = ref(false);
  const pageFullToggle = function (enter: Function, exit: Function) {
    if (isPageFullscreen.value) {
      exit();
    } else {
      enter();
    }
    isPageFullscreen.value = !isPageFullscreen.value;
  };
</script>

<style lang="less" scoped>
  @import './BasicLayout.less';
</style>
