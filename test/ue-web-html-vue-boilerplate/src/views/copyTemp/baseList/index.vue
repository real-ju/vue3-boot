<template>
  <a-card :bordered="false" class="layout-content-card">
    <s-table-search :props="{ model: searchForm }" :formItems="searchItems" @search="handleSearch" />
    <a-row>
      <a-col :span="24">
        <a-space size="small">
          <a-popconfirm title="确定批量删除？" @confirm="funDelete">
            <a-button type="primary">批量删除</a-button>
          </a-popconfirm>
          <a-button type="primary" @click="handleView(1)">新增</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" v-show="selectedRows.length > 0" style="padding-top: 4px">
        <a-alert :showIcon="true" type="info">
          <template #message>已选择 {{ selectedRows.length }}项 <a @click="onSelectChange([], [])">清空</a></template>
        </a-alert>
      </a-col>
    </a-row>
    <a-row style="padding-top: 8px">
      <a-col :span="24">
        <a-table
          size="middle"
          rowKey="id"
          :loading="loading"
          :row-selection="{ selectedRowKeys: selectedRows.map(x => x.id), onChange: onSelectChange }"
          :columns="columns"
          :data-source="dataSource"
          :pagination="{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100', '200'],
            current: dataPaging.current,
            pageSize: dataPaging.pageSize,
            total: dataPaging.total,
            onChange: queryList,
            onShowSizeChange: queryList,
            showTotal: (total: number) => `共 ${total} 条`
          }"
          :customRow="onClickRow"
          :scroll="{ x: columns.length * 120 }"
        >
          <template #bodyCell="{ text, record, column }">
            <template v-if="column.key === 'action'">
              <a @click="handleView(2, record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除？" @confirm="funDelete(record)">
                <a>删除</a>
              </a-popconfirm>
            </template>
            <template v-if="column.key === 'status'">
              <a-badge :color="handleStatus(text, 'color', statusMap)" />
              <span :style="{ color: handleStatus(text, 'color', statusMap) }">{{
                handleStatus(text, 'text', statusMap)
              }}</span>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts" name="CopyTempBaseList">
  import useCurrentInstance from '@/utils/useCurrentInstance';
  import { useGlobalStore } from '@/store/modules/global';
  import { date2str } from '@/utils/util';
  import { pageQuery, handleDelete, batchDelete } from './services/ListService';

  // 获取全局挂载的方法，proxy相当于this
  const { proxy } = useCurrentInstance();

  // 添加页签
  const route = useRoute();
  const router = useRouter();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
    handleSearch();
  });

  // 动态绑定查询字段，并设置默认值
  const searchForm = reactive<Record<string, any>>({
    key1: '',
    key2: '',
    key3: undefined,
    key4: null,
    key5: null
  });
  // 定义查询字段：输入框类型、提示文字、数据源...更多属性请参考ui库组件属性
  const searchItems = reactive([
    { type: 'input', fieldName: 'key1', placeholder: '字段1' },
    { type: 'input', fieldName: 'key2', placeholder: '字段2' },
    {
      type: 'select',
      fieldName: 'key3',
      placeholder: '字段3',
      allowClear: true,
      options: [
        { value: '1', label: '选择1' },
        { value: '2', label: '选择2' },
        { value: '3', label: '选择3' }
      ]
    },
    { type: 'date-picker', fieldName: 'key4', allowClear: true },
    { type: 'range-picker', fieldName: 'key5', allowClear: true }
  ]);
  // 状态值数据源
  const statusMap = {
    1: {
      text: '状态1',
      color: 'green'
    },
    2: {
      text: '状态2',
      color: 'orange'
    },
    3: {
      text: '状态3',
      color: 'red'
    }
  };
  // 处理状态方法
  const handleStatus = (value: number | string, type: string, list: Record<number | string, any>) => {
    return list[value] ? list[value][type] || '' : '';
  };
  // table列表加载状态
  const loading = ref<boolean>(false);
  // table列表数据源
  const dataSource = ref<Record<string, any>[]>([]);
  // table列表表头字段定义
  const columns = reactive<Record<string, any>[]>([
    { title: '操作', key: 'action', width: 100, fixed: 'left' },
    { title: '字段1', key: 'key1', dataIndex: 'key1' },
    { title: '字段2', key: 'key2', dataIndex: 'key2' },
    { title: '状态', key: 'status', dataIndex: 'status' },
    { title: '字段3', key: 'key3', dataIndex: 'key3', customRender: ({ text }: any) => date2str(text, 'YYYY-MM-DD') },
    { title: '字段4', key: 'key4', dataIndex: 'key4', customRender: ({ text }: any) => date2str(text, 'YYYY-MM-DD') },
    { title: '字段5', key: 'key5', dataIndex: 'key5' }
  ]);
  // table列表已勾选数据
  const selectedRows = ref<Record<string, any>[]>([]);
  // table列表分页
  const dataPaging = ref<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // table列表查询接口及数据处理方法
  const queryList = (current: number, pageSize: number) => {
    loading.value = true;
    const params: Record<string, any> = {
      current,
      pageSize,
      ...searchForm
    };
    if (searchForm.key5?.length) {
      params.startTime = searchForm.key5[0];
      params.endTime = searchForm.key5[1];
      delete params.key5;
    }
    // pageQuery(params).then(res => {
    //   if (+res.code === 0) {
    //     loading.value = false;
    //     const data = res.data || {};
    //     dataSource.value = data.list || [];
    //     dataPaging.value = data.paging;
    //   }
    // });
  };

  // table列表行双击操作
  const onClickRow = (record: Record<string, any>) => {
    return {
      on: {
        dblclick: () => {
          handleView(2, record);
        }
      }
    };
  };

  // table列表多页勾选逻辑
  const onSelectChange = (keys: string[], rows: Record<string, any>[]) => {
    let oldSelected = JSON.parse(JSON.stringify(selectedRows.value));
    let newSelected = [];
    if (oldSelected.length) {
      rows.forEach(x => {
        const has = selectedRows.value.some(item => item.id === x.id);
        if (!has) {
          oldSelected.push(x);
        }
      });
    } else {
      oldSelected = rows;
    }
    newSelected = oldSelected.filter((x: Record<string, any>) => keys.indexOf(x.id) > -1);
    selectedRows.value = newSelected;
  };

  // 定义查询组件点击查询、重置按钮后触发的逻辑
  const handleSearch = () => {
    onSelectChange([], []);
    // 查询
    queryList(1, dataPaging.value.pageSize);
  };

  // 跳转进入详情的路由
  const handleView = (type: number, record?: Record<string, any>) => {
    if (type === 1) {
      // router.push({ path: `/copyTemp/baseList/operate` });
    } else if (type === 2) {
      // router.push({ path: `/copyTemp/baseList/operate?id=${record?.id}` });
    }
  };

  // 批量删除
  const funDelete = (record?: Record<string, any>) => {
    if (!!record) {
      // handleDelete({
      //   id: record.id
      // }).then(res => {
      //   if (+res.code === 0) {
      //     proxy.$message.success(res.message || '');
      //     selectedRows.value = [];
      //     queryList(1, dataPaging.value.pageSize);
      //   }
      // });
    } else {
      if (selectedRows.value.length === 0) {
        return proxy.$message.warning('请至少选择一条数据');
      }
      const ids = selectedRows.value.map(x => x.id);
      // batchDelete(ids).then(res => {
      //   if (+res.code === 0) {
      //     proxy.$message.success(res.message || '');
      //     selectedRows.value = [];
      //     queryList(1, dataPaging.value.pageSize);
      //   }
      // });
    }
  };
</script>

<style lang="less" scoped></style>
