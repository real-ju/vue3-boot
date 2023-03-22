<template>
  <div v-show="treeData && treeData.length" class="organizationSelect">
    <a-tree-select
      v-model:value="currentUser.organizationId"
      tree-node-label-prop="orgName"
      search-placeholder="切换组织"
      :get-popup-container="(triggerNode: HTMLElement)=>triggerNode.parentNode"
      :dropdown-style="{ maxHeight: 300, maxWidth: 160 }"
      :dropdown-match-select-width="false"
      style="width: 100px; top: 1px; margin-left: 10px"
      :tree-data="treeData"
      :field-names="{
        children: 'child',
        label: 'orgName',
        value: 'orgId'
      }"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts" name="Organization">
  import type { OrgInfo } from '#/store';
  import { useGlobalStore } from '@/store/modules/global';
  import { useUserStore } from '@/store/modules/user';
  import { storageItem } from '@/utils/session';

  interface treeDataNode {
    rootId?: string;
    orgId?: string;
    orgName?: string;
    child?: Array<treeDataNode>;
    enabled?: boolean;
    selectable?: boolean;
    class?: string;
  }

  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const currentUser = computed(() => userStore.getUserInfo);
  const treeData = computed(() => {
    const change = (data: Array<OrgInfo>) => {
      const newData = data.map(item => {
        const obj: treeDataNode = { ...item };
        obj.selectable = obj.enabled;
        if (!obj.enabled) {
          obj.class = 'selected-disabled';
        }
        if (obj.child && obj.child.length) {
          obj.child = change(obj.child);
        }
        return obj;
      });
      return newData;
    };
    const orgList = change(userStore.getUserInfo.orgList || []);
    return orgList;
  });
  const onChange = function (value: string, label: Array<string>) {
    userStore
      .setCurrentOrganization({
        orgId: value,
        orgName: label.length ? label[0] : ''
      })
      .then(response => {
        if (+response.code === 0) {
          storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT', value);
          storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT_NAME', label.length ? label[0] : '');
          location.reload();
        }
      });
    globalStore.closeAllPagePanes();
  };
</script>

<style lang="less" scoped>
  .organizationSelect {
    :deep(.ant-select) {
      .ant-tree-select-dropdown {
        .ant-select-tree-treenode {
          .ant-select-tree-node-content-wrapper {
            .ant-select-tree-title {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
          }
        }
      }
      .selected-disabled {
        > span.ant-select-tree-node-content-wrapper {
          cursor: not-allowed;
          color: rgba(0, 0, 0, 0.25);
          &:hover {
            background-color: #fff;
          }
        }
      }
    }
  }
</style>
