<template>
  <a-form-item
    :colon="colon"
    :label="label"
    :labelAlign="labelAlign"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
    :name="name"
    :rules="rules"
  >
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
    // 是否显示 label 后面的冒号
    colon: {
      type: Boolean,
      default: true
    },
    // label 标签的文本
    label: {
      type: String,
      default: null
    },
    // 标签文本对齐方式
    labelAlign: {
      type: String,
      default: 'right'
    },
    // label 标签布局
    labelCol: {
      type: Object,
      default: () => null
    },
    // 输入控件布局
    wrapperCol: {
      type: Object,
      default: () => null
    },
    // 表单域 model 字段
    name: {
      type: [String, Array<String>],
      default: null
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: null
    },
    props: {
      type: Object,
      default: () => {}
    }
  });
</script>
<style lang="less" scoped></style>
