<template>
  <a-card :bordered="false" class="layout-content-card">
    <pre>
      <code style="font-weight: bold;">第一步：</code>
        <code>在前端项目/src/views文件夹下创建新文件夹</code>
        <code>新文件夹以模块单词命名，要求首字母小写，采取驼峰方式，例如：page、pageOne；不允许写page-one、PageOne写法</code>
        <code>在新文件夹中建立以.vue结尾的文件名，要求采取驼峰方式，例如：page.vue、pageOne.vue、PageOne.vue；不允许写page-one写法</code>
      
      <code style="font-weight: bold;">第二步：</code>
        <code>.vue文件中的内容为以下：请复制</code>
        <code style="font-weight: bold;">或者直接前往左侧目录：模板 -> 基础列表，复制代码</code>
        <code style="font-weight: bold;">name定义要求：首字母大写，驼峰式写法，<span style="color:red">要求不可重复</span></code>
        <code>例如：文件路径为/src/views/page/pageOne.vue</code>
        <code>则推荐文件名为：PageOne，或使用文件夹名拼接文件名PagePageOne</code>

        <code>{{ code }}</code>
        <code>{{ code1 }}</code>
    </pre>
  </a-card>
</template>

<script setup lang="ts" name="SyntaxBase">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });

  const code = ref(
    `<template>
          <a-card :bordered="false" class="layout-content-card">
            这里写页面内容；这里写页面内容；这里写页面内容；
          </a-card>
        </template>
        <script setup lang="ts" name="文件名称(不允许重复，请查看本页规定的name定义要求)">
          import { useGlobalStore } from '@/store/modules/global';

          const route = useRoute();
          const globalStore = useGlobalStore();
          这里定义页面数据；这里定义页面数据；这里定义页面数据；
          onActivated(() => {
            globalStore.onMenuSelect(route);
          });
          这里定义页面方法；这里定义页面方法；这里定义页面方法；`
  );
  // eslint-disable-next-line no-useless-escape
  const code1 = ref(`<\/script>
        <style lang="less" scoped>
          这里写页面样式；这里写页面样式；这里写页面样式；
        </style>`);
</script>

<style lang="less" scoped></style>
