<template>
  <div class="container exception-page">
    <div class="exception-content">
      <img src="/src/assets/images/exception/404.png" alt="exception" />
      <div class="title">{{ code }}</div>
      <div class="desc">{{ exceptionTipMap[code] }}</div>
      <button class="back-btn" @click="backHome">返回首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  code: {
    type: Number,
    default: 404
  }
});

const exceptionTipMap: Recordable<string> = {
  404: '抱歉，您访问的页面不存在。',
  403: '抱歉，您没有访问权限。'
};

const router = useRouter();

const backHome = () => {
  router.replace('/');
};
</script>

<style lang="less" scoped>
.exception-page {
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;

  .exception-content {
    text-align: center;
    padding-bottom: 40px;

    img {
      width: 250px;
      height: 295px;
      margin-bottom: 32px;
    }

    .title {
      font-size: 32px;
      line-height: 1.8;
    }

    .desc {
      color: rgba(0, 0, 0, 0.45);
    }

    .back-btn {
      padding: 8px 15px;
      margin-top: 32px;
      background-color: #1890ff;
      color: white;
      border-radius: 2px;
      cursor: pointer;
      transition: background-color 0.25s;

      &:hover {
        background-color: lighten(#1890ff, 10%);
      }

      &:active {
        background-color: darken(#1890ff, 5%);
      }
    }
  }
}
</style>
