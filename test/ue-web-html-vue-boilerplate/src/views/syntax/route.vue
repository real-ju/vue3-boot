<template>
  <a-card :bordered="false" class="layout-content-card">
    <pre>
      <code style="font-weight: bold;">第三步：</code>
        <code>打开/src/config/router.conifg.ts文件</code>
        <code>在此文件下添加路由,路由格式如下：</code>
        <code>第二步中已创建的文件路径为：/src/views/page/pageOne.vue，文件的name定义为：PagePageOne</code>
        <code>{{ code }}</code>
    </pre>
  </a-card>
</template>

<script setup lang="ts" name="SyntaxRoute">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });

  const code = ref(
    `{
          path: '/page/pageOne',
          name: 'PagePageOne',
          component: () => import('@/views/page/pageOne.vue'),
          meta: { title: '菜单名称' }
        },`
  );
</script>

<style lang="less" scoped></style>
