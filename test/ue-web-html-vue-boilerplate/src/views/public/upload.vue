<template>
  <a-card :bordered="false" class="layout-content-card">
    <s-input type="upload" accept=".xls,.xlsx" :beforeUpload="beforeUpload" />
    <s-input type="upload-dragger" :beforeUpload="beforeUpload" />
  </a-card>
</template>

<script setup lang="ts" name="PublicUpload">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });

  const beforeUpload = (file: File, fileList: File[]) => {
    console.log(file);
  };
</script>

<style lang="less" scoped></style>
