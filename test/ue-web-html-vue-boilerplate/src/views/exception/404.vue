<template>
  <div class="exception-404">
    <div>
      <img height="430" width="430" src="/images/exception/404.png" />
      <div class="exception-404-title">很遗憾，该页面不存在</div>
      <div class="exception-404-desc">也许已被删除或地址变更</div>
      <a class="exception-404-btn" href="/">
        <span> 返回首页 </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts" name="404"></script>

<style lang="less" scoped>
  .exception-404 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .exception-404-title {
      height: 42px;
      font-size: 30px;
      color: #222226;
      line-height: 42px;
    }
    .exception-404-desc {
      height: 33px;
      font-size: 24px;
      color: #999aaa;
      line-height: 33px;
      margin-top: 6px;
    }
    .exception-404-btn {
      display: inline-block;
      font-size: 12px;
      color: #fff;
      background: #3fc1c9;
      border: 1px solid #3fc1c9;
      border-radius: 3px;
      line-height: 1;
      padding: 7px 15px;
      margin-top: 15px;
      cursor: pointer;
    }
  }
</style>
