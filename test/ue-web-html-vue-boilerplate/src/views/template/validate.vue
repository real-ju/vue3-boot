<template>
  <div>
    <h1>逻辑校验提示</h1>
    <a-button type="primary">逻辑校验提示</a-button>
  </div>
</template>

<script setup lang="ts" name="TemplateValidate">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
</script>

<style lang="less" scoped></style>
