<template>
  <div class="sider-menu-style">
    <a-menu
      mode="inline"
      :inlineIndent="10"
      v-model:selectedKeys="menuKeys.selectedSiderKeys"
      v-model:openKeys="menuKeys.openKeys"
    >
      <template v-for="item in showMenus.sideMenuList">
        <template v-if="item.children && item.children.length">
          <recursive-menu-item :menuData="item" subtype="side" :key="item.path" />
        </template>
        <template v-else>
          <a-menu-item :key="item.path" @click="goto(item)">
            <template #icon v-if="item.meta?.icon">
              <svg-icon v-if="/^svg-/.test(item.meta?.icon)" :name="item.meta?.icon" />
              <ant-icon v-else :type="item.meta?.icon" />
            </template>
            {{ item.meta?.title }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts" name="SiderMenu">
  import { MenuItem } from '@/router/types';
  defineProps(['settings', 'menuKeys', 'showMenus']);
  const router = useRouter();
  const goto = (item: MenuItem) => {
    const path = item.meta?.target ?? item.path;
    if (item.meta?.target) {
      window.open(path, item.meta?.blank ? '_blank' : '_self');
    } else {
      router.push({ path });
    }
  };
</script>

<style lang="less" scoped>
  .sider-menu-style {
    height: 100%;
    overflow: hidden auto;
    // :deep(.ant-menu) {
    //   background: inherit;
    // }
    .ant-menu-root {
      border-right: none;
      min-height: 100%;
    }
    :deep(.ant-menu-root) {
      .ant-menu-item {
        margin: 0;
      }
      .ant-menu-submenu-title {
        margin: 0;
      }
    }
  }
</style>
