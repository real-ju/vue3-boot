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
    @focus="(e: any) => actionInput('focus', e)"
    @change="(e: any) => actionInput('change', e)"
    @blur="(e: any) => actionInput('blur', e)"
    @pressEnter="(e: any) => actionInput('pressEnter', e)"
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
    :autoSize="autoSize"
    :style="style"
    :read-only="readonly"
    @pressEnter="(e: any) => {e.stopPropagation();actionInput('pressEnter', obj[fieldName]);}"
  />
  <!-- @pressEnter.stop -->
  <a-radio-group
    v-else-if="type === 'radio-group'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :options="dataSource"
  >
    <slot></slot>
  </a-radio-group>
  <a-checkbox
    v-else-if="type === 'checkbox'"
    :data-name="fieldName"
    v-model:checked="obj[fieldName]"
    :disabled="currentDisabled"
  >
    {{ checkboxLabel }}
    <slot></slot>
  </a-checkbox>
  <a-checkbox-group
    v-else-if="type === 'checkbox-group'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :options="dataSource"
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
    :style="style"
    :showToday="showToday"
    :valueFormat="valueFormat"
    :picker="picker"
  />
  <a-range-picker
    v-else-if="type === 'range-picker'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :allowClear="allowClear"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    :style="style"
    :valueFormat="valueFormat"
  />
  <a-select
    v-else-if="type === 'select'"
    :data-name="fieldName"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :placeholder="placeholder"
    :style="style"
    :options="dataSource"
    :allowClear="allowClear"
    :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
    :filterOption="filterOption"
    :getPopupContainer="getPopupContainer"
    :labelInValue="labelInValue"
    :maxTagCount="maxTagCount"
    :maxTagTextLength="maxTagTextLength"
    :mode="mode"
    :optionFilterProp="optionFilterProp"
    :optionLabelProp="optionLabelProp"
    :showArrow="showArrow"
    :showSearch="showSearch"
    @focus="(e: any) => actionInput('focus', e)"
    @change="(e: any, option: any) => actionInput('change', e, option)"
    @select="(e: any, option: any)=> actionInput('select', e, option)"
    @search="(e: any)=> actionInput('search', e)"
    @blur="(e: any) => actionInput('blur', e)"
  >
    <slot></slot>
  </a-select>
  <a-auto-complete
    v-else-if="type === 'auto-complete'"
    v-model:value="obj[fieldName]"
    :disabled="currentDisabled"
    :allowClear="allowClear"
    :filterOption="filterOption"
    :options="dataSource"
    :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
    @focus="(e: any) => actionInput('focus', e)"
    @change="(e: any) => actionInput('change', e)"
    @select="(e: any, option: any)=> actionInput('select', e, option)"
    @search="(e: any)=> actionInput('search', e)"
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
    :checkedValue="checkedValue"
    :unCheckedValue="unCheckedValue"
    :checkedChildren="checkedChildren"
    :unCheckedChildren="unCheckedChildren"
    @click="(e: any) => actionInput('click', e)"
    @change="(e: any) => actionInput('change', e)"
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
    :dropdownMatchSelectWidth="dropdownMatchSelectWidth"
    :fieldNames="fieldNames"
    :filterTreeNode="filterTreeNode"
    :getPopupContainer="getPopupContainer"
    :labelInValue="labelInValue"
    :maxTagCount="maxTagCount"
    :multiple="multiple"
    :treeCheckable="treeCheckable"
    :treeCheckStrictly="treeCheckStrictly"
    :treeData="treeData"
    :treeIcon="treeIcon"
    :treeNodeFilterProp="treeNodeFilterProp"
    :treeNodeLabelProp="treeNodeLabelProp"
    @change="(e: any, option: any) => actionInput('change', e, option)"
    @select="(e: any, option: any)=> actionInput('select', e, option)"
    @search="(e: any)=> actionInput('search', e)"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-tree-select>
  <a-upload
    v-else-if="type === 'upload'"
    name="file"
    :multiple="multiple"
    :showUploadList="false"
    :accept="accept"
    :fileList="[]"
    :beforeUpload="beforeUploadFile"
  >
    <a-button type="primary">上传文件</a-button>
  </a-upload>
  <a-upload-dragger
    v-else-if="type === 'upload-dragger'"
    name="file"
    :multiple="multiple"
    :showUploadList="false"
    :accept="accept"
    :fileList="[]"
    :beforeUpload="beforeUploadFile"
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
    :min="min"
    :max="max"
    :formatter="formatter"
    :parser="parser"
    :precision="precision"
    :step="step"
    :stringMode="stringMode"
  >
    <template v-for="item in Object.keys(slots)" :key="item" #[item]>
      <slot :name="item"></slot>
    </template>
  </a-input-number>
  <slot v-else></slot>
  <!-- </div> -->
</template>

<script setup lang="ts" name="SInput">
  import useCurrentInstance from '@/utils/useCurrentInstance';
  const { proxy } = useCurrentInstance();
  const slots = useSlots();

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
    // 样式
    style: {
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
    // 是否展示字数
    showCount: {
      type: Boolean,
      default: false
    },
    // 自适应内容高度
    autoSize: {
      type: [Boolean, Object],
      default: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 数据源
    options: {
      type: Array,
      default: (val: any) => {
        if (val.type === 'checkbox-group') {
          return [];
        } else {
          return null;
        }
      }
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
    checkboxLabel: {
      type: String,
      default: null
    },
    // 设置选择器类型
    picker: {
      type: String,
      default: 'date'
    },
    // 绑定值的格式
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // 是否展示“今天”按钮
    showToday: {
      type: Boolean,
      default: false
    },
    // 下拉菜单和选择器同宽
    dropdownMatchSelectWidth: {
      type: Boolean,
      default: true
    },
    filterOption: {
      type: Boolean,
      default: true
    },
    popupIndex: {
      type: Number,
      default: 1
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    maxTagCount: {
      type: Number,
      default: null
    },
    maxTagTextLength: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: null
    },
    optionFilterProp: {
      type: String,
      default: 'value'
    },
    optionLabelProp: {
      type: String,
      default: (val: any) => {
        if (val.type === 'select') {
          if (val.options && val.options.length) {
            return 'label';
          } else {
            return 'children';
          }
        } else {
          return 'value';
        }
      }
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    fieldNames: {
      type: Object,
      default: () => ({
        key: 'value',
        value: 'value',
        label: 'title',
        children: 'children'
      })
    },
    // value、label、title可为string | string[]
    replaceFields: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label',
        title: 'label'
      })
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: true
    },
    unCheckedValue: {
      type: [Boolean, String, Number],
      default: false
    },
    checkedChildren: {
      type: String,
      default: null
    },
    unCheckedChildren: {
      type: String,
      default: null
    },
    filterTreeNode: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    treeCheckable: {
      type: Boolean,
      default: false
    },
    treeCheckStrictly: {
      type: Boolean,
      default: false
    },
    // 数据源
    treeData: {
      type: Array,
      default: () => []
    },
    treeIcon: {
      type: Boolean,
      default: false
    },
    treeLine: {
      type: Boolean,
      default: false
    },
    treeNodeFilterProp: {
      type: String,
      default: 'title'
    },
    treeNodeLabelProp: {
      type: String,
      default: 'title'
    },
    accept: {
      type: String,
      default: null
    },
    beforeUpload: {
      type: Function,
      default: () => false
    },
    fileNameReg: {
      type: RegExp,
      default: () => /^[-\w\u4e00-\u9fa5]{1,}$/
    },
    fileSize: {
      type: Number,
      default: 50
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    formatter: {
      type: Function,
      default: undefined
    },
    parser: {
      type: Function,
      default: undefined
    },
    precision: {
      type: Number,
      default: undefined
    },
    step: {
      type: [Number, String],
      default: 1
    },
    stringMode: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['fun-disabled', 'click', 'focus', 'change', 'blur', 'pressEnter', 'select', 'search']);

  const currentDisabled = computed(() => {
    let disabled = props.disabled;
    emit('fun-disabled', (bool: boolean) => {
      disabled = bool;
    });
    return disabled;
  });

  const dataSource = computed(() => {
    let data = null;
    if (props.options) {
      data = props.options.map((x: any) => {
        const item = { ...x };
        for (const key in props.replaceFields) {
          if (typeof props.replaceFields[key] !== 'string') {
            item[key] = props.replaceFields[key].map((y: string) => x[y]).join('|');
          } else {
            item[key] = x[props.replaceFields[key]];
          }
        }
        return item;
      });
    }
    return data;
  });

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
    if (props.fileNameReg && !props.fileNameReg.test(fileName)) {
      proxy.$message.error('抱歉，文件名称只支持数字、字母、中文、下划线、减号');
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
