import { httpRequest } from '@/utils/request';
import { LoginModel, CheckUserTokenModel, UserLogoutModel, SetCurrentOrganizationModel } from './model/loginModel';
import { SystemPlatCode } from '@/store/mutation-types';

const userApi = {
  // 获取 RSA 加密公钥
  getRsaPublicKey: '/auth/oauth/pubKey',
  // 登录获取token
  login: '/auth/oauth/token',
  // 获取用户信息
  userInfo: '/system/sysUser/getUserInfo',
  // 退出登录
  logout: '/auth/oauth/logout',
  // 验证码
  getCaptcha: '/auth/oauth/getCaptcha',
  // 跳转sso登录
  checkUserToken: '/system/syncUser/checkUserToken',
  // sso注销
  userLogout: '/system/syncUser/userLogout',
  // 根据用户ID获取角色列表
  getUserRoleInfo: '/system/sysUser/getUserRoleInfo',
  // 切换用户组织
  setCurrentOrganization: '/system/sysUser/switchUserCurrentOrg'
  // // 根据字典表名list获取字典表
  // queryDictList: '/customs/grass/dataDict/queryDictList'
};

// 获取 RSA 加密公钥
export function getRsaPublicKey() {
  return httpRequest({
    url: userApi.getRsaPublicKey,
    method: 'get'
  });
}
// 登录获取token
export function login(params: LoginModel) {
  return httpRequest({
    url: userApi.login,
    method: 'post',
    params,
    headers: {
      Authorization: 'Basic c3VwZXJsdWN5X3N5bmVyZ3k6c3luZXJneS0xcWF6LTJ3c3g=',
      'Content-Type': 'multipart/form-data; boundary=something'
    }
  });
}
// 获取用户信息
export function getInfo() {
  return httpRequest({
    url: userApi.userInfo,
    method: 'get',
    params: { platCode: SystemPlatCode }
  });
}
// 退出登录
export function logout() {
  return httpRequest({
    url: userApi.logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
}
// 验证码
export function getCaptcha() {
  return httpRequest({
    url: userApi.getCaptcha,
    method: 'get'
  });
}
// 跳转sso登录
export function checkUserToken(params: CheckUserTokenModel) {
  return httpRequest({
    url: `${userApi.checkUserToken}`,
    method: 'post',
    params: { ...params, plat: SystemPlatCode }
  });
}
// sso注销
export function userLogout(params: UserLogoutModel) {
  return httpRequest({
    url: userApi.userLogout,
    method: 'post',
    params
  });
}
// 根据用户ID获取角色列表
export function getUserRoleInfo(userId: string) {
  return httpRequest({
    url: userApi.getUserRoleInfo,
    method: 'get',
    params: { id: userId }
  });
}
// 切换用户组织
export function setCurrentOrganization(params: SetCurrentOrganizationModel) {
  return httpRequest({
    url: userApi.setCurrentOrganization,
    method: 'put',
    params
  });
}
// // 根据字典表名list获取字典表
// export function queryDictList(params: string[]) {
//   return httpRequest({
//     url: userApi.queryDictList,
//     method: 'post',
//     data: params
//   });
// }
