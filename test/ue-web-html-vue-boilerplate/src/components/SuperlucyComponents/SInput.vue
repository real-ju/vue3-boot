<template>
  <!-- <div>
    <fieldset>
      <legend>Personalia:</legend>
    </fieldset> -->
  <a-input
    v-if="type === 'input'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    :maxLength="maxLength"
    :allowClear="allowClear"
    v-bind="$attrs"
    v-on="onFun"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-input>
  <a-textarea
    v-else-if="type === 'textarea'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :maxLength="maxLength"
    :placeholder="placeholder"
    :allowClear="allowClear"
    v-bind="$attrs"
    v-on="onFun"
  />
  <a-radio-group
    v-else-if="type === 'radio-group'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    v-bind="$attrs"
    v-on="onFun"
  >
    <slot></slot>
  </a-radio-group>
  <a-checkbox
    v-else-if="type === 'checkbox'"
    :data-name="fieldName"
    v-model:checked="obj[fieldName]"
    :disabled="currentDisabled"
    v-bind="$attrs"
    v-on="onFun"
  >
    <slot></slot>
  </a-checkbox>
  <a-checkbox-group
    v-else-if="type === 'checkbox-group'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    v-bind="$attrs"
    v-on="onFun"
  >
    <slot></slot>
  </a-checkbox-group>
  <a-date-picker
    v-else-if="type === 'date-picker'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :allowClear="allowClear"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="onFun"
  />
  <a-range-picker
    v-else-if="type === 'range-picker'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :allowClear="allowClear"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="onFun"
  />
  <a-select
    v-else-if="type === 'select'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    :allowClear="allowClear"
    :getPopupContainer="getPopupContainer"
    v-bind="$attrs"
    v-on="onFun"
  >
    <slot></slot>
  </a-select>
  <a-auto-complete
    v-else-if="type === 'auto-complete'"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :allowClear="allowClear"
    v-bind="$attrs"
    v-on="onFun"
  >
    <a-input
      :data-name="fieldName"
      :placeholder="placeholder"
      :maxLength="maxLength"
      @blur="(e: any)=>actionInput('blur', obj[fieldName])"
      @pressEnter="(e: any) => actionInput('pressEnter', obj[fieldName])"
    >
      <template v-for="item in Object.keys(slots)" :key="item" #[item]>
        <slot :name="item"></slot>
      </template>
    </a-input>
  </a-auto-complete>
  <a-switch
    v-else-if="type === 'switch'"
    :data-name="fieldName"
    v-model:checked="obj[fieldName]"
    :disabled="currentDisabled"
    v-bind="$attrs"
    v-on="onFun"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-switch>
  <a-tree-select
    v-else-if="type === 'tree-select'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    :allowClear="allowClear"
    :filterTreeNode="filterTreeNode"
    :getPopupContainer="getPopupContainer"
    :treeNodeFilterProp="treeNodeFilterProp"
    v-bind="$attrs"
    v-on="onFun"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-tree-select>
  <a-upload
    v-else-if="type === 'upload'"
    name="file"
    :showUploadList="false"
    :fileList="[]"
    :accept="accept"
    :beforeUpload="beforeUploadFile"
    v-bind="$attrs"
  >
    <a-button type="primary">上传文件</a-button>
  </a-upload>
  <a-upload-dragger
    v-else-if="type === 'upload-dragger'"
    name="file"
    :showUploadList="false"
    :fileList="[]"
    :accept="accept"
    :beforeUpload="beforeUploadFile"
    v-bind="$attrs"
  >
    <p class="ant-upload-drag-icon">
      <ant-icon type="InboxOutlined" />
    </p>
    <p class="ant-upload-text">点击或者拖动文件到虚线框内上传</p>
  </a-upload-dragger>
  <a-input-number
    v-else-if="type === 'input-number'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    v-bind="$attrs"
    v-on="onFun"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-input-number>
  <slot v-else></slot>
  <!-- </div> -->
</template>

<script setup lang="ts" name="SInput">
  import type { PropType } from 'vue';
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import { stringToCamelCase } from '@/utils/util';

  const { proxy, funProps } = useCurrentInstance();
  const slots = useSlots();

  interface FileNameReg {
    reg: RegExp | false;
    message: string;
  }

  const props = defineProps({
    // 输入框类型 input|textarea|radio-group|checkbox|checkbox-group|date-picker|range-picker|select|auto-complete|switch|tree-select|upload|upload-dragger
    type: {
      type: String,
      default: 'input'
    },
    // 字段名
    fieldName: {
      type: String,
      default: ''
    },
    // 字段的父级
    obj: {
      type: Object,
      default: () => ({})
    },
    // 是否禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入框提示文字
    placeholder: {
      type: [String, Array<String>],
      default: (val: any) => {
        if (val.type === 'input' || val.type === 'textarea') {
          return '请输入';
        } else if (val.type === 'date-picker') {
          return '请选择日期';
        } else if (val.type === 'range-picker') {
          return ['开始时间', '结束时间'];
        } else if (val.type === 'select' || val.type === 'auto-complete') {
          return '请选择';
        } else {
          return undefined;
        }
      }
    },
    // 最大长度
    maxLength: {
      type: Number,
      default: null
    },
    // 是否显示清除按钮
    allowClear: {
      type: Boolean,
      default: (val: any) => {
        if (['date-picker', 'range-picker', 'select', 'auto-complete', 'tree-select'].includes(val.type)) {
          return true;
        } else {
          return false;
        }
      }
    },
    // 菜单渲染父节点,默认为1渲染到第一个父节点，值可选1-8，这个范围外渲染到body
    popupIndex: {
      type: Number,
      default: 1
    },
    // 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值
    filterTreeNode: {
      type: Boolean,
      default: true
    },
    // 输入项过滤对应的 treeNode 属性
    treeNodeFilterProp: {
      type: String,
      default: 'title'
    },
    accept: {
      type: String,
      default: null
    },
    // 上传文件的逻辑方法
    beforeUpload: {
      type: Function,
      default: () => false
    },
    // upload上传文件的文件名格式正则, reg为false不校验
    fileNameReg: {
      type: Object as PropType<FileNameReg>,
      default: () => ({
        reg: /^[-\w\u4e00-\u9fa5]{1,}$/,
        message: '抱歉，文件名称只支持数字、字母、中文、下划线、减号'
      })
    },
    // upload上传文件支持的最大MB
    fileSize: {
      type: Number,
      default: 50
    }
  });

  const emit = defineEmits(['fun-disabled', 'click', 'focus', 'change', 'blur', 'pressEnter', 'select', 'search']);

  // type 为 upload、upload-dragger 没有绑定此方法，如需使用，请用勿用此组件，用原生组件自行定义
  const onFun = computed(() => {
    const names = ['click', 'focus', 'change', 'blur', 'pressEnter', 'select', 'search'];
    const funs: Record<string, Function> = {};
    names.forEach((key: string) => {
      if (typeof funProps[stringToCamelCase(`on-${key}`)] === 'function') {
        if (props.type === 'auto-complete' && (key === 'blur' || key === 'pressEnter')) {
          // auto-complete的blur和pressEnter事件绑在内部input上
        } else {
          funs[key] = (e: any, option?: any) => actionInput(key, e, option);
        }
      }
    });
    return funs;
  });

  const currentDisabled = computed(() => {
    let disabled = props.disabled;
    emit('fun-disabled', (bool: boolean) => {
      disabled = bool;
    });
    return disabled;
  });

  // 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。
  const getPopupContainer = (triggerNode: any) => {
    if (props.popupIndex === 1) {
      return triggerNode.parentNode;
    } else if (props.popupIndex === 2) {
      return triggerNode.parentNode.parentNode;
    } else if (props.popupIndex === 3) {
      return triggerNode.parentNode.parentNode.parentNode;
    } else if (props.popupIndex === 4) {
      return triggerNode.parentNode.parentNode.parentNode.parentNode;
    } else if (props.popupIndex === 5) {
      return triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    } else if (props.popupIndex === 6) {
      return triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    } else if (props.popupIndex === 7) {
      return triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    } else if (props.popupIndex === 8) {
      return triggerNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    } else {
      return document.body;
    }
  };

  const actionInput = (type: any, e: any, option?: any) => {
    emit(type, e, option);
  };

  const beforeUploadFile = (file: File, fileList: File[]) => {
    const pointIndex = file.name.lastIndexOf('.');
    const fileName = pointIndex > -1 ? file.name.slice(0, pointIndex) : file.name;
    const type = pointIndex > -1 ? file.name.slice(pointIndex + 1) : '';
    if (props.fileNameReg.reg && !props.fileNameReg.reg.test(fileName)) {
      proxy.$message.error(props.fileNameReg.message);
      return false;
    }
    const typeList = props.accept ? props.accept.split(',') : [];
    const isType = typeList.length ? typeList.includes(`.${type}`) : true;
    if (!isType) {
      proxy.$message.error('抱歉，目前不支持该格式文件');
      return false;
    }
    if (props.fileSize > 0) {
      const isLt = file.size / 1024 / 1024 <= props.fileSize;
      if (!isLt) {
        proxy.$message.error(
          `上传失败，您上传的文件格式为${type}，文件大小不能超过${props.fileSize}MB，请调整后上传。`
        );
        return false;
      }
    }
    props.beforeUpload(file, fileList);
    return false;
  };
</script>
<style lang="less" scoped></style>
