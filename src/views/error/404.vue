<template>
  <div class="container error-page">
    <div class="error-content">
      <img src="/src/assets/images/error/404.png" />
      <div class="error-title">404</div>
      <div class="error-desc">抱歉，你访问的页面不存在。</div>
      <el-button class="error-btn" type="primary" @click="backHome">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
// TODO Vue3写法
export default {
  beforeCreate() {
    document.title = '404 Not Found';
  },
  methods: {
    backHome() {
      this.$router.replace('/');
    }
  }
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
      font-size: 30px;
      line-height: 1.8;
    }

    .error-desc {
      color: rgba(0, 0, 0, 0.45);
    }

    .error-btn {
      margin-top: 32px;
    }
  }
}
</style>
