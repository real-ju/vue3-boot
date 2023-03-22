<template>
  <a-card :bordered="false" class="layout-content-card">
    <s-table-search
      ref="searchRef"
      :formItems="formItems"
      :props="{
        model: obj
      }"
      :batchOptions="[
        { value: 'id', label: '流水号' },
        { value: 'companyName', label: '企业信息' },
        { value: 'entryId', label: '报关单号' }
      ]"
      @search="handleSearch"
    />
    <a-button @click="handleClick">按钮</a-button>
  </a-card>
</template>

<script setup lang="ts" name="PublicSearch">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
  const searchRef = ref<any>(null);
  const obj = reactive({
    key1: '',
    key2: '',
    key3: '',
    key4: '',
    key5: 'false',
    key6: null,
    key7: null,
    key8: undefined,
    key9: '',
    key10: 'false'
  });
  const formItems = reactive([
    { type: 'input', fieldName: 'key1' },
    { type: 'input', fieldName: 'key2' },
    {
      type: 'input',
      fieldName: 'key3'
    },
    {
      type: 'input',
      fieldName: 'key4'
    },
    { type: 'input', fieldName: 'key5' },
    { type: 'date-picker', fieldName: 'key6' },
    { type: 'range-picker', fieldName: 'key7' },
    {
      type: 'select',
      fieldName: 'key8',
      options: [
        { value: '1', label: '选择1' },
        { value: '2', label: '选择2' },
        { value: '3', label: '选择3' }
      ]
    },
    {
      type: 'auto-complete',
      fieldName: 'key9',
      options: [
        { value: '1', label: '自动完成1' },
        { value: '2', label: '自动完成2' },
        { value: '3', label: '自动完成3' }
      ]
    },
    { type: 'input', fieldName: 'key10' }
  ]);
  const handleClick = () => {
    console.log(2);
    searchRef.value?.handleSearch(0);
  };
  const handleSearch = () => {
    console.log(6);
  };
</script>

<style lang="less" scoped></style>
