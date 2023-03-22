<template>
  <div>
    <h1>可编辑列表</h1>
    <a-button type="primary">可编辑列表</a-button>
  </div>
</template>

<script setup lang="ts" name="TemplateEditInput">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
</script>

<style lang="less" scoped></style>
