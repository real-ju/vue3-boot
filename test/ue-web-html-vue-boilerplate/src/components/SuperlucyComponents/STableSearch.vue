<template>
  <a-form class="form-box-key-enter s-form-margin-8" ref="searchFormRef" v-bind="formProps">
    <a-row style="padding-bottom: 8px" v-if="batchOptions.length > 0">
      <a-radio-group v-model:value="searchType" button-style="solid">
        <a-radio-button value="base">基础查询</a-radio-button>
        <a-radio-button value="batch">批量查询</a-radio-button>
      </a-radio-group>
    </a-row>
    <a-row v-show="searchType === 'base'">
      <a-col
        v-for="(item, index) in formItems"
        v-show="index + 1 < colNum * showRowNum || expandForm"
        :flex="`0 0 calc(100% / ${colNum})`"
        :key="item.fieldName"
      >
        <s-form-item :name="item.fieldName" :props="{ ...item, obj: formProps.model }" />
      </a-col>
      <a-col :flex="`0 0 calc(100% / ${colNum})`">
        <s-form-item :props="{ type: 'btn' }">
          <a-space size="small">
            <a-button type="primary" @click="handleSearch(1)">查询</a-button>
            <a-button @click="handleSearch(0)">重置</a-button>
            <a-button
              class="advanced-search-btn"
              type="text"
              primary
              @click="toggleForm"
              v-if="formItems.length + 1 > colNum * showRowNum"
            >
              <ant-icon :type="expandForm ? 'UpOutlined' : 'DownOutlined'" />
            </a-button>
          </a-space>
        </s-form-item>
      </a-col>
    </a-row>
    <a-row v-if="batchOptions.length > 0" v-show="searchType === 'batch'">
      <a-col :span="4">
        <s-form-item :props="{ type: 'select', obj: formProps.model, fieldName: 'batchType', options: batchOptions }" />
      </a-col>
      <a-col :span="8">
        <s-form-item
          name="batchValue"
          :props="{
            type: 'textarea',
            obj: formProps.model,
            fieldName: 'batchValue',
            rows: 4,
            style: { whiteSpace: 'pre-wrap' },
            autoSize: false
          }"
        />
      </a-col>
      <a-col :span="6">
        <s-form-item :props="{ type: 'btn' }">
          <a-space size="small">
            <a-button type="primary" @click="handleSearch(1)">查询</a-button>
            <a-button @click="handleSearch(0)">重置</a-button>
          </a-space>
        </s-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts" name="STableSearch">
  import type { Rule } from 'ant-design-vue/es/form';
  import type { FormInstance } from 'ant-design-vue';
  const defProps = defineProps({
    formItems: {
      type: Array<any>,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({})
    },
    // 每行几个
    colNum: {
      type: Number,
      default: 5
    },
    // 收起时显示几行
    showRowNum: {
      type: Number,
      default: 1
    },
    batchOptions: {
      type: Array<any>,
      default: () => []
    }
  });
  const emit = defineEmits(['search']);

  const searchFormRef = ref<FormInstance>();

  const validatorBatchValue = (_rule: Rule, value: string) => {
    // console.log(value);
    if (!value) {
      return Promise.resolve();
    } else {
      value = value.replace(/[\f\t\v ]/g, '');
      const lines = value.split(/\n/);
      if (lines.length > 100) {
        return Promise.reject(new Error('超过最大100行，请修改'));
      } else if (lines.some(x => !x || !x.trim())) {
        return Promise.reject(new Error('您输入了空行数据，请重新输入'));
      } else if (lines.some(x => lines.filter(y => x === y).length >= 2)) {
        return Promise.reject(new Error('您输入了重复数据，请检查'));
      } else {
        return Promise.resolve();
      }
    }
  };

  const formProps = computed(() => {
    const initProps: any = {
      name: 's-',
      wrapperCol: { span: 23 },
      model: {},
      rules: {}
    };

    const data = { ...initProps, ...defProps.props };
    if (defProps.batchOptions.length > 0) {
      if (!data.model.batchType) {
        data.model.batchType = defProps.batchOptions[0].value;
      }
      data.rules.batchValue = [{ validator: validatorBatchValue }];
    }
    return data;
  });
  const expandForm = ref(false);
  const searchType = ref('base');

  // 切换展开/收起
  const toggleForm = () => {
    expandForm.value = !expandForm.value;
  };

  // 查询/重置
  const handleSearch = (buttonType: number) => {
    // 按钮类型判断是否重置表单
    if (!buttonType) {
      searchFormRef.value?.resetFields();
    }
    if (searchType.value === 'batch') {
      searchFormRef.value
        ?.validateFields()
        .then((_values: any) => {
          // console.log(values);
          // const searchValues = { ...values };
          // searchValues.batchType = values.batchType;
          // searchValues.batchValue = values.batchValue ? values.batchValue.split(/\n/) : [];
          // console.log(searchValues);
          // emit('search', searchValues);
          emit('search');
        })
        .catch(_error => {
          // console.log('error', error);
        });
    } else {
      // emit('search', formProps.value.model);
      emit('search');
    }
  };

  // defineExpose({
  //   handleSearch
  // });
</script>
<style lang="less" scoped>
  .advanced-search-btn {
    padding: 0;
    color: var(--ant-primary-color);
    line-height: 32px;
  }
</style>
