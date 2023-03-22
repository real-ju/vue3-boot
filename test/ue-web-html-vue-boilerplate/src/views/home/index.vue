<template>
  <a-card class="home-page-style" :bordered="false">
    <div class="home-title-greetings">欢迎进入{{ title }}系统！</div>
  </a-card>
</template>

<script setup lang="ts" name="HomePage">
  import defaultSettings from '@/config/defaultSettings';
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  const title = ref(<string>defaultSettings.title);
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
</script>

<style lang="less" scoped>
  .home-page-style {
    background-image: url('/images/banner3.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    border-radius: 0;
    :deep(.ant-card-body) {
      height: 100%;
    }
    .home-title-greetings {
      font-size: 44px;
      text-align: center;
      margin-top: 10%;
      font-weight: bold;
    }
  }
</style>
