<template>
  <a-dropdown v-if="getUserInfo.name" placement="bottomRight">
    <div class="user-avatar-dropdown-menu">
      <!-- <a-avatar
        style="border: 1px solid #999"
        src="http://zentao.io.superlucy.net/data/upload/1/202204/0813494105550nl8"
      /> -->
      <svg-icon name="svg-yonghu" style="font-size: 20px; vertical-align: text-top" />
      <span style="padding-left: 6px">{{ getUserInfo.name }}</span>
    </div>
    <template #overlay>
      <a-menu class="dropdown-menu-style">
        <a-menu-item key="center" @click="handleToCenter">
          <ant-icon type="UserOutlined" />
          个人中心
        </a-menu-item>
        <a-menu-item
          key="permission"
          @click="handleToPermissiton"
          v-if="proxy.$auth(`${SystemPlatCode}-setting-permissions`)"
        >
          <ant-icon type="LockOutlined" />
          权限管理
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="handleLogout">
          <ant-icon type="LogoutOutlined" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" style="margin-left: 8; margin-right: 8" />
  </span>
</template>

<script setup lang="ts" name="AvatarDropdown">
  import { useUserStore } from '@/store/modules/user';
  import { storageItem } from '@/utils/session';
  import { Authorization, SystemPlatCode } from '@/store/mutation-types';
  import useCurrentInstance from '@/utils/useCurrentInstance';

  const userStore = useUserStore();
  const router = useRouter();
  const { proxy } = useCurrentInstance();

  const getUserInfo = computed(() => {
    const { nickName, username } = userStore.getUserInfo ?? {};
    return { name: nickName ?? username };
  });

  const handleToCenter = () => {
    router.push({ path: '/account/settings' });
  };
  const handleToPermissiton = () => {
    const { applications } = userStore.getAccountInfo ?? {};
    let url = '';
    const data = applications ?? [];
    const index = data.findIndex(x => x.code === SystemPlatCode);
    if (index > -1) {
      const permissions = data[index].children || [];
      const i = permissions.findIndex(x => x.code === `${SystemPlatCode}-setting`);
      if (i > -1) {
        const settingData = permissions[i].children || [];
        const j = settingData.findIndex(x => x.code === `${SystemPlatCode}-setting-permissions`);
        if (j > -1 && settingData[j].route) {
          url = `${settingData[j].route}/permission/sso/login?tk=${storageItem.getItem(Authorization)}`;
        }
      }
    }
    if (!!url) {
      router.push({ path: url });
    } else {
      proxy.$message.warning('地址不存在，请联系管理员检查');
    }
  };
  const handleLogout = () => {
    proxy.$confirm({
      title: '信息',
      content: '您确定要注销吗？',
      onOk: () => {
        userStore.logout().then(() => {
          router.push({ path: '/user/login' });
          location.reload();
        });
      },
      onCancel() {}
    });
  };
</script>

<style lang="less" scoped>
  .user-avatar-dropdown-menu {
    display: inline-block;
    padding: 0 10px;
    white-space: nowrap;
  }
</style>
