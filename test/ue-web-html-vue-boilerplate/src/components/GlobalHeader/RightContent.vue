<template>
  <a-space>
    <svg-icon :name="isFullscreen ? 'svg-fullscreen-exit' : 'svg-fullscreen'" @click="toggle" />
    <svg-icon name="svg-shezhi" @click="showSettings = true" />
  </a-space>
  <!-- <notice-icon /> -->
  <organization />
  <avatar-dropdown />
  <setting-drawer
    :settings="settings"
    :showSettings="showSettings"
    @close-settings="closeSettings"
    @update-setting="updateSetting"
  />
</template>

<script setup lang="ts" name="RightContent">
  defineProps(['settings']);

  const emit = defineEmits(['update-setting']);

  const { isFullscreen, toggle } = useFullscreen();

  const showSettings = ref<boolean>(false);
  const closeSettings = () => {
    showSettings.value = false;
  };

  // 更新设置
  const updateSetting = (type: string, value: any) => {
    emit('update-setting', type, value);
  };
</script>

<style lang="less" scoped></style>
