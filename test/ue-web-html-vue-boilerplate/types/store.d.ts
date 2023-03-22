// 路由权限
export interface ApplicationRouter {
  // 权限的id
  id: string;
  // 权限的名字
  name: string;
  // 权限的编码
  code: string;
  // 显示顺序
  appSort: number;
  // 权限类型
  appType: string;
  // 是否拥有该权限
  userOwn: boolean;
  // 接口地址
  apiUrl?: string;
  // 权限类型
  appCateTypeIds?: string;
  // 权限类型
  appCategory?: number;
  // 租户ID
  rootId?: string;
  // 父级ID
  parentId?: string;
  // 路由
  route?: string;
  // 状态
  status?: number;
  // 跳转模式
  target?: string;
  component?: string;
  // 子级
  children?: ApplicationRouter[];
  // 备注
  remark?: string;
}

// 组织
export interface OrgInfo {
  rootId?: string;
  orgId?: string;
  orgName?: string;
  child?: OrgInfo[];
  enabled?: boolean;
}

// 用户信息
export interface UserInfo {
  // 用户ID
  id?: string;
  // 租户ID
  rootId?: string;
  // 用户账号
  username?: string;
  // 用户昵称
  nickName?: string;
  // 用户类型
  userType?: string[];
  // 用户邮箱
  email?: string;
  // 手机号码
  telephone?: string;
  // 用户性别
  sex?: number;
  // 身份证号码
  icCardNo?: string;
  // 头像地址
  avata?: string;
  // 帐号状态
  status?: number;
  // 角色编码
  rootCode?: string;
  // 角色名称
  rootName?: string;
  customsCode?: string;
  orgType?: string[];
  tokenId?: string;
  currentOrg?: OrgInfo;
  orgList?: OrgInfo[];
  organizationId?: string;
}

export interface AccountInfo {
  applications?: ApplicationRouter[];
  user?: UserInfo;
}

export interface UserRole {
  // 角色id
  id: string;
  // 角色名称
  roleName: string;
  // 角色代码
  roleCode: string;
  // 角色备注
  remark: string;
  // createdBy: string;
  // grantCascade:
  // roleSort:
  // roleType:
  // rootId:
  // 角色状态
  status: number;
}

export interface UserState {
  token: string;
  name: string;
  accountInfo: AccountInfo;
  userInfo: UserInfo;
  userRoles: UserRole[];
  menuPermissions: string[];
  actionPermissions: string[];
}

export interface PagePaneItem {
  title: string;
  key: string;
}

export interface GlobalState {
  pagePanes: PagePaneItem[];
  pageActiveKey: string;
}
