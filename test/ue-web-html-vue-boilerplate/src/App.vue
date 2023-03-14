<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  import useCurrentInstance from '@/utils/useCurrentInstance';
  import defaultSettings from '@/config/defaultSettings';

  const { proxy } = useCurrentInstance();
  proxy.$configProvider.config({
    theme: {
      primaryColor: defaultSettings.primaryColor
    }
  });
  dayjs.locale('cn');

  // 在同一个标签且class为form-box-key-enter下，
  // 回车跳至下一非隐藏输入框，最后一输入框回车将跳至第一输入框
  document.onkeydown = function (e) {
    if (e.code === 'Enter') {
      nextTick(() => {
        const form = proxy.$('.form-box-key-enter');
        let formIndex = -1;
        // 找到当前元素包含在哪个.form-box-key-enter中
        for (let k = 0; k < form.length; k++) {
          if (proxy.$.contains(form[k], e.target as HTMLElement)) {
            formIndex = k;
            break;
          }
        }
        // 找到当前.form-box-key-enter中非置灰输入框
        const inputEles = proxy.$(form[formIndex]).find('.ant-input').not('.ant-input-disabled');
        // 过滤出非隐藏输入框
        const showInputEles = inputEles.filter((index: string | number) => {
          const flag = proxy.$(inputEles[index]).is(':hidden');
          return !flag;
        });
        for (let i = 0; i < showInputEles.length; i++) {
          if (e.target === showInputEles[i]) {
            if (i === showInputEles.length - 1) {
              showInputEles[0].focus();
              showInputEles[0].select();
            } else {
              showInputEles[i + 1].focus();
              showInputEles[i + 1].select();
            }
          }
        }
      });
    }
  };
</script>

<style lang="less"></style>
