<template>
  <a-form-item :name="name || props.fieldName" v-bind="$attrs">
    <s-input v-bind="props">
      <template v-for="k in Object.keys(slots)" :key="k" #[k]>
        <slot :name="k"></slot>
      </template>
    </s-input>
  </a-form-item>
</template>

<script setup lang="ts" name="SFormItem">
  const slots = useSlots();

  defineProps({
    // 表单域 model 字段
    name: {
      type: [String, Array<String>],
      default: null
    },
    props: {
      type: Object,
      default: () => {}
    }
  });
</script>
<style lang="less" scoped></style>
