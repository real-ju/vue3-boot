<template>
  <div>
    <h1>EXCEL批量编辑</h1>
    <a-button type="primary">EXCEL批量编辑</a-button>
  </div>
</template>

<script setup lang="ts" name="PublicBatchExcel">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
</script>

<style lang="less" scoped></style>
