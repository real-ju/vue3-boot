<template>
  <div class="s-scale-box" ref="scaleBoxRef">
    <div
      class="s-scale-canvas"
      :style="{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
        ...canvasStyle
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="SScaleBox">
  import ResizeObserver from 'resize-observer-polyfill';
  const props = defineProps({
    // 画布实际宽高
    canvasWidth: {
      type: Number,
      default: 1920
    },
    canvasHeight: {
      type: Number,
      default: 1080
    }
  });

  const scaleBoxRef = ref<any>(null);

  // 整体等比例缩放
  const canvasStyle = reactive({
    transform: 'scale(1, 1) translate(-50%, -50%)'
  });
  const equalScale = () => {
    // 当前窗口宽高比例
    // const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;
    const windowWidth = scaleBoxRef.value?.clientWidth;
    const windowHeight = scaleBoxRef.value?.clientHeight;
    // 相对于画布原始宽高的缩放比例
    const scaleX = windowWidth / props.canvasWidth;
    const scaleY = windowHeight / props.canvasHeight;
    canvasStyle.transform = `scale(${scaleX}, ${scaleY}) translate(-50%, -50%)`;
  };

  onMounted(() => {
    const robserver = new ResizeObserver((entries: any) => {
      equalScale();
    });
    robserver.observe(scaleBoxRef.value);
  });
</script>
<style lang="less" scoped>
  .s-scale-box {
    width: 100%;
    height: 100%;
    position: relative;
    .s-scale-canvas {
      display: flex;
      flex-direction: column;
      transform-origin: 0 0;
      position: absolute;
      left: 50%;
      top: 50%;
      transition: 0.3s;
    }
  }
</style>
