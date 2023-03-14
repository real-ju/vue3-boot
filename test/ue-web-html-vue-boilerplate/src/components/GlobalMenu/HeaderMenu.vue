<template>
  <a-menu mode="horizontal" v-model:selectedKeys="menuKeys.selectedTopKeys" theme="light">
    <template v-for="item in showMenus.topMenuList">
      <template v-if="item.children && item.children.length">
        <recursive-menu-item :menuData="item" subtype="head" :key="item.path" />
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
</template>

<script setup lang="ts" name="HeaderMenu">
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

<style lang="less" scoped></style>
