<template>
  <a-card :bordered="false" class="layout-content-card">
    <s-input type="input" :obj="obj" fieldName="a" @change="changeinput" />
    <br />
    <s-input type="textarea" :obj="obj" fieldName="b" />
    <br />
    <s-input
      type="radio-group"
      :obj="obj"
      fieldName="c"
      :options="[
        { value: '4', label: '44' },
        { value: '3', label: '33' }
      ]"
    />
    <br />
    <s-input type="radio-group" :obj="obj" fieldName="c">
      <a-radio value="1">A</a-radio>
      <a-radio value="2">B</a-radio>
      <a-radio value="3">C</a-radio>
      <a-radio value="4">D</a-radio>
    </s-input>
    <br />
    <s-input
      type="checkbox-group"
      :obj="obj"
      fieldName="d"
      :options="[
        { value: '4', label: '44' },
        { value: '3', label: '33' }
      ]"
    />
    <br />
    <s-input type="checkbox-group" :obj="obj" fieldName="e">
      <a-checkbox value="1">A</a-checkbox>
      <a-checkbox value="2">B</a-checkbox>
      <a-checkbox value="3">C</a-checkbox>
      <a-checkbox value="4">D</a-checkbox>
    </s-input>
    <br />
    <s-input type="checkbox" :obj="obj" fieldName="f">xuan</s-input>
    <br />
    <s-input type="date-picker" :obj="obj" fieldName="g" />
    <br />
    <s-input type="range-picker" :obj="obj" fieldName="h" />
    <br />
    <s-input type="select" :obj="obj" fieldName="i" :filterOption="true" :style="{ width: '100px' }">
      <a-select-option value="1">A</a-select-option>
      <a-select-option value="2">B</a-select-option>
      <a-select-option value="3">C</a-select-option>
      <a-select-option value="4">D</a-select-option>
    </s-input>
    <br />
    <s-input
      type="select"
      :obj="obj"
      fieldName="j"
      :options="[
        { value: '1', label: '44' },
        { value: '2', label: '55555' },
        { value: '3', label: '55577' },
        { value: '4', label: '33555' },
        { value: '5', label: '33hhhh' },
        { value: '6', label: '33666' },
        { value: '7', label: '33888' }
      ]"
      :style="{ width: '100px' }"
    />
    <br />
    <s-input
      type="auto-complete"
      :obj="obj"
      fieldName="k"
      :options="[
        { value: '4', label: '44' },
        { value: '3', label: '33' }
      ]"
    />
    <br />
    <s-form-item
      label="123"
      name="a"
      :props="{
        type: 'input',
        obj: obj,
        fieldName: 'a'
      }"
      @change="changeinput"
    >
      <template #suffix>
        <span>33</span>
      </template>
    </s-form-item>
    <br />
    <s-input type="switch" :obj="obj" fieldName="l" checked-children="开" un-checked-children="关" />
    <br />
    <s-input type="switch" :obj="obj" fieldName="m">
      <template #checkedChildren><span>4444</span></template>
      <template #unCheckedChildren><span>666</span></template>
    </s-input>
    <br />
    <s-input type="input-number" :obj="obj" fieldName="n" placeholder="数量" />
  </a-card>
</template>

<script setup lang="ts" name="PublicMixUse">
  import { useGlobalStore } from '@/store/modules/global';

  const route = useRoute();
  const globalStore = useGlobalStore();
  onActivated(() => {
    globalStore.onMenuSelect(route);
  });
  const obj = reactive({
    a: '4',
    b: '4',
    c: '4',
    d: ['4'],
    e: ['4'],
    f: true,
    g: null,
    h: null,
    i: '4',
    j: '4',
    k: { value: '4', label: '44' },
    l: true,
    m: false,
    n: ''
  });
  const changeinput = () => {
    console.log(444);
  };
</script>

<style lang="less" scoped></style>
