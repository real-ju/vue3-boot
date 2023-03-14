<template>
  <a-card :bordered="false" class="layout-content-card">
    <a-form ref="TableFormRef" name="oneList" :model="tableList" :rules="tableRules">
      <a-row>
        <a-space size="small">
          <a-button size="small" type="primary" @click="funAdd('oneList')">
            <template #icon><ant-icon type="PlusOutlined" /></template>
            新增
          </a-button>
          <a-button size="small" type="primary" @click="outInput"> 控制台显示出table数据 </a-button>
        </a-space>
      </a-row>
      <a-row style="padding-top: 6px" class="s-table">
        <div class="s-table-div" :style="{ maxWidth: `${oneColumns.length * 100}px` }">
          <a-table
            tableLayout="fixed"
            bordered
            size="small"
            rowKey="id"
            :columns="oneColumns"
            :data-source="tableList.oneList || []"
            :pagination="false"
            :scroll="{ x: oneColumns.length * 70 }"
          >
            <template #headerCell="{ title }">
              <span>{{ title }}</span>
            </template>
            <template #bodyCell="{ record, column, index }">
              <template v-if="column.key === 'serialNum'">
                <div style="text-align: center">
                  {{ index + 1 }}
                </div>
              </template>
              <template v-if="column.key === 'key1'">
                <s-form-item
                  :name="['oneList', index, 'key1']"
                  :rules="tableRules.key1"
                  :props="{
                    type: 'input-number',
                    obj: record,
                    fieldName: 'key1',
                    placeholder: '字段1'
                  }"
                />
              </template>
              <template v-if="column.key === 'key2'">
                <s-form-item
                  :name="['oneList', index, 'key2']"
                  :rules="tableRules.key2"
                  :props="{
                    type: 'input',
                    obj: record,
                    fieldName: 'key2',
                    placeholder: '字段2',
                    maxlength: 5
                  }"
                />
              </template>
              <template v-if="column.key === 'key3'">
                <s-form-item
                  :name="['oneList', index, 'key3']"
                  :rules="tableRules.key3"
                  :props="{
                    type: 'select',
                    obj: record,
                    fieldName: 'key3',
                    placeholder: '字段3',
                    allowClear: true,
                    options: [
                      { value: '1', label: '选择1' },
                      { value: '2', label: '选择2' },
                      { value: '3', label: '选择3' }
                    ]
                  }"
                />
              </template>
              <template v-if="column.key === 'key4'">
                <s-form-item
                  :name="['oneList', index, 'key4']"
                  :rules="tableRules.key4"
                  :props="{
                    type: 'input',
                    obj: record,
                    fieldName: 'key4',
                    placeholder: '字段4',
                    maxlength: 5
                  }"
                />
              </template>
              <template v-if="column.key === 'key5'">
                <s-form-item
                  :name="['oneList', index, 'key5']"
                  :rules="tableRules.key5"
                  :props="{
                    type: 'input',
                    obj: record,
                    fieldName: 'key5',
                    placeholder: '字段5',
                    maxlength: 5
                  }"
                />
              </template>
              <template v-if="column.key === 'action'">
                <a @click="funDelete('oneList', record)">删除</a>
              </template>
            </template>
          </a-table>
        </div>
      </a-row>
    </a-form>
  </a-card>
</template>

<script setup lang="ts" name="CopyTempEditTable">
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import { useGlobalStore } from '@/store/modules/global';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';

  // 获取全局挂载的方法，proxy相当于this
  const { proxy } = useCurrentInstance();

  // 添加页签
  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });

  // 校验前转换字段值
  const transform = (val: any) => {
    let value = val;
    if (value || value === 0) {
      value = String(value);
    }
    return value;
  };

  // a-form绑定ref
  const TableFormRef = ref<FormInstance>();
  // 详情校验
  const tableRules = reactive<Record<string, Rule[]>>({
    key1: [{ required: true, whitespace: true, message: '必填', transform }],
    key2: [{ required: true, whitespace: true, message: '必填' }],
    key3: [{ required: true, whitespace: true, message: '必填' }]
  });

  // 列表数据源
  const tableList = reactive<Record<string, Record<string, any>[]>>({
    oneList: [{ id: 'new-1' }, { id: 'new-2' }, { id: 'new-3' }, { id: 'new-4' }]
  });
  // 列表表头字段定义
  const oneColumns = reactive<Record<string, any>[]>([
    { title: '序号', key: 'serialNum', dataIndex: 'serialNum', width: 40 },
    {
      title: '字段1',
      key: 'key1',
      dataIndex: 'key1',
      customHeaderCell: () => {
        return { class: 'required-field-name' };
      }
    },
    {
      title: '字段2',
      key: 'key2',
      dataIndex: 'key2',
      customHeaderCell: () => {
        return { class: 'required-field-name' };
      }
    },
    {
      title: '字段3',
      key: 'key3',
      dataIndex: 'key3',
      customHeaderCell: () => {
        return { class: 'required-field-name' };
      }
    },
    { title: '字段4', key: 'key4', dataIndex: 'key4' },
    { title: '字段5', key: 'key5', dataIndex: 'key5' },
    {
      title: '操作',
      key: 'action',
      width: 60,
      align: 'center',
      fixed: 'right'
    }
  ]);

  // 新增
  const funAdd = (dataName: string) => {
    const data = tableList[dataName];
    const item: Record<string, any> = { id: 'new-' + proxy.$moment().format('x') };
    if (dataName === 'oneList') {
      item.key1 = '1';
      item.key2 = '0.5';
      item.key3 = '2';
      item.key4 = '';
      item.key5 = '';
    }
    data.push(item);
    tableList[dataName] = data;
  };

  // 删除
  const funDelete = (dataName: string, record: Record<string, any>) => {
    let data = tableList[dataName];
    data = data.filter(x => record.id && x.id !== record.id);
    tableList[dataName] = data;
  };

  // 去除前端添加的id
  const removeNewId = (arr: Record<string, any>[]) => {
    const data = arr.map(item => {
      const obj = { ...item };
      if (obj.id && /^new-\d{1,}$/.test(obj.id)) {
        obj.id = '';
      }
      return obj;
    });
    return data;
  };

  const outInput = () => {
    console.log(tableList);
    console.log(tableList.oneList);
    // oneList
    const oneList = removeNewId(tableList.oneList || []);
    console.log(oneList);
  };
</script>

<style lang="less" scoped></style>
