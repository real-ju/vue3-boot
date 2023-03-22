<template>
  <a-sub-menu :key="menuData.path" :popupClassName="`basic-layout-${subtype}-submenu`">
    <template #icon v-if="menuData.meta?.icon">
      <svg-icon v-if="/^svg-/.test(menuData.meta?.icon)" :name="menuData.meta?.icon" />
      <ant-icon v-else :type="menuData.meta?.icon" />
    </template>
    <template #title>{{ menuData.meta?.title }}</template>
    <template v-for="item in menuData.children">
      <template v-if="item.children && item.children.length">
        <recursive-menu-item :menuData="item" :subtype="subtype" :key="item.path" />
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
  </a-sub-menu>
</template>

<script setup lang="ts" name="RecursiveMenuItem">
  import { MenuItem } from '@/router/types';
  defineProps(['menuData', 'subtype']);
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
