<template>
  <div class="container error-page">
    <div class="error-content">
      <img src="/src/assets/images/error/404.png" alt="error-404" />
      <div class="error-title">404</div>
      <div class="error-desc">抱歉，你访问的页面不存在。</div>
      <button class="error-btn" @click="backHome">返回首页</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

let router = useRouter();

const backHome = () => {
  router.replace('/');
};
</script>

<style lang="scss" scoped>
.error-page {
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-content {
    text-align: center;
    padding-bottom: 40px;

    img {
      width: 250px;
      height: 295px;
      margin-bottom: 32px;
    }

    .error-title {
      font-size: 32px;
      line-height: 1.8;
    }

    .error-desc {
      color: rgba(0, 0, 0, 0.45);
    }

    .error-btn {
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
