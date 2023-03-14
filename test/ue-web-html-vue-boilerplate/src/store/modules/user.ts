import { Authorization, SystemPlatCode } from '@/store/mutation-types';
import { login, getInfo, getUserRoleInfo, logout, setCurrentOrganization } from '@/api/login';
import type { Result } from '#/axios';
import type { ApplicationRouter, UserInfo, AccountInfo, UserRole, UserState } from '#/store';
import { storageItem } from '@/utils/session';
// import notices from '@/utils/notices'
import { LoginModel, SetCurrentOrganizationModel } from '@/api/model/loginModel';

function formatPermissionData(menuPermissions: string[], actionPermissions: string[], data: ApplicationRouter[]) {
  data.forEach(per => {
    if (per.userOwn) {
      if (per.appType === 'module' || per.appType === 'menu') {
        menuPermissions.push(per.code);
      } else if (per.appType === 'button') {
        actionPermissions.push(per.code);
      }
      if (Boolean(per.children) && (per.children ?? []).length > 0) {
        formatPermissionData(menuPermissions, actionPermissions, per.children ?? []);
      }
    }
  });
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    name: '',
    accountInfo: {},
    userInfo: {},
    userRoles: [],
    menuPermissions: [],
    actionPermissions: []
  }),
  getters: {
    getAccountInfo(): AccountInfo {
      return this.accountInfo;
    },
    getUserInfo(): UserInfo {
      return this.userInfo;
    },
    getMenuPermissions(): string[] {
      return this.menuPermissions;
    },
    getActionPermissions(): string[] {
      return this.actionPermissions;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAccountInfo(accountInfo: AccountInfo) {
      this.accountInfo = accountInfo;
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    setUserRoles(userRoles: UserRole[]) {
      this.userRoles = userRoles;
    },
    setMenuPermissions(menuPermissions: string[]) {
      this.menuPermissions = menuPermissions;
    },
    setActionPermissions(actionPermissions: string[]) {
      this.actionPermissions = actionPermissions;
    },
    // 登录
    async login(userInfo: LoginModel): Promise<any> {
      const res = await login(userInfo);
      if (+res.code === 0 || +res.code === 110002) {
        const result = res.data;
        storageItem.setItem(Authorization, result.token);
        this.setToken(result.token);
        // this.setGlobalDictionary();
      }
      return res;
      // return new Promise((resolve, reject) => {
      //   login(userInfo)
      //     .then(res => {
      //       if (+res.code === 0 || +res.code === 110002) {
      //         const result = res.data
      //         storageItem.setItem(Authorization, result.token);
      //         this.setToken(result.token)
      //       }
      //       resolve(res)
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    },
    // 获取用户信息
    async getInfo(): Promise<any> {
      const res = await getInfo();
      if (+res.code === 0) {
        const role = res.data ?? {};
        const userInfo = role.user ?? {};
        // // 连接 websocket
        // notices.openSocket()

        const orgInfo = userInfo.currentOrg ?? {};
        // 设置当前组织
        userInfo.organizationId = orgInfo.orgId ?? '';

        const applications = (role.applications ?? []).filter((x: ApplicationRouter) => x.code === SystemPlatCode);

        const menuPermissions: string[] = [];
        const actionPermissions: string[] = [];
        formatPermissionData(menuPermissions, actionPermissions, applications);

        this.setAccountInfo(role);
        this.setUserInfo(userInfo);
        this.setMenuPermissions(menuPermissions);
        this.setActionPermissions(actionPermissions);
        // this.setAvatar(userInfo.avatar ?? '')

        // 报关行信息
        storageItem.setItem('CUSTOMS_BROKER_ID', userInfo.rootId ?? '');
        storageItem.setItem('CUSTOMS_BROKER_NO', userInfo.customsCode ?? '');
        storageItem.setItem('CUSTOMS_BROKER_CODE', userInfo.rootCode ?? '');
        storageItem.setItem('CUSTOMS_BROKER_NAME', userInfo.rootName ?? '');
        // 设置当前组织
        storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT', orgInfo.orgId ?? '');
        storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT_NAME', orgInfo.orgName ?? '');
        storageItem.setItem('CUSTOMS_ORGANIZATION_TYPE', userInfo.orgType ?? []);
      }
      return res;
    },
    // 获取用户角色
    async getUserRoleInfo(userId: string): Promise<any> {
      const res = await getUserRoleInfo(userId);
      if (+res.code === 0) {
        const result = res.data;
      }
      return res;
    },
    // 登出
    async logout(): Promise<any> {
      const res = await logout();
      if (+res.code === 0) {
        this.setToken('');
        this.setAccountInfo({});
        this.setUserInfo({});
        storageItem.removeItem(Authorization);
        // 报关行信息
        storageItem.removeItem('CUSTOMS_BROKER_ID');
        storageItem.removeItem('CUSTOMS_BROKER_NO');
        storageItem.removeItem('CUSTOMS_BROKER_CODE');
        storageItem.removeItem('CUSTOMS_BROKER_NAME');
        // 组织信息
        storageItem.removeItem('CUSTOMS_ORGANIZATION_UNIT');
        storageItem.removeItem('CUSTOMS_ORGANIZATION_UNIT_NAME');
        storageItem.removeItem('CUSTOMS_ORGANIZATION_TYPE');
      }
      return res;
    },
    // 切换组织
    async setCurrentOrganization(org: SetCurrentOrganizationModel): Promise<any> {
      const res = await setCurrentOrganization(org);
      if (+res.code === 0) {
        storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT', org.orgId ?? '');
        storageItem.setItem('CUSTOMS_ORGANIZATION_UNIT_NAME', org.orgName ?? '');
        location.reload();
      }
      return res;
    },
    // 获取字典表
    setGlobalDictionary() {
      // const tableNameList = [
      //   'dic_application_type', // 企业性质
      //   'dic_brand_condition', // 申报要素的品牌类型
      //   'dic_cargo_attribute', // 货物属性
      //   'dic_country_code', // 启运/运抵国(地区)/贸易国别(地区)/表体最终目的国/原产国（地区）
      //   // 'dim_country_encode',// 产销国
      //   'dic_currency_code', // 币制/表体币制
      //   'dic_customs_dcltype', // 报关单类型上
      //   'dic_customs_dec_type', // 报关单类型下
      //   'dic_customs_declaration_transfer', // 报关转关类型
      //   'dic_customs_district', // 申报地海关/进出境关别
      //   'dic_customs_invt_dec_type', // 核注清单的报关单类型
      //   'dic_customs_invt_flow_type', // 流转类型
      //   'dic_customs_invt_invt_type', // 清单类型
      //   'dic_domestic', // 境内目的地/境内货源地
      //   'dic_domestic_ports', // 离/入境口岸
      //   'dic_domestic_six', // 目的地代码/产地代码
      //   'dic_enterprise_product_type_i', // 企业资质类别进口
      //   'dic_enterprise_product_type_e', // 企业资质类别出口
      //   'dic_exemption_mode', // 征免方式
      //   'dic_exemption_nature', // 征免性质
      //   'dic_exports_at_hui', // 申报要素的出口享惠情况
      //   'dic_inspection_quarantine', // 检验检疫受理机关/领证机关/目的地检验检疫机关
      //   'dic_inspection_quarantine_visa', // 检验检疫签证申报要素——申请单证
      //   'dic_measuring_unit', // 成交单位/法定单位/第二单位
      //   'dic_origin_area', // 原产地区
      //   'dic_permit_type_i', // 产品资质的许可证类别进口
      //   'dic_permit_type_e', // 产品资质的许可证类别出口
      //   'dic_port_code', // 经停/指运港/启运港
      //   'dic_related_reasons', // 关联理由
      //   'dic_sold_mode', // 成交方式
      //   'dic_supervise_mode', // 监管方式
      //   'dic_transport_mode', // 运输方式
      //   'dic_use_code', // 用途
      //   'dic_wrap_type', // 包装种类
      //   'dic_regional_type' // 区域场所类别
      // ];
      // const allSource = {};
      // const res = await getDictionaryList(tableNameList);
      // if (+res.code === 0) {
      //   const data = res.data || {};
      //   tableNameList.map(item => {
      //     let list = data[item] || [];
      //     list = list.map(x => {
      //       const obj = {};
      //       const code = 'code';
      //       let name = 'name';
      //       if (
      //         item === 'dic_brand_condition' ||
      //         item === 'dic_customs_dcltype' ||
      //         item === 'dic_customs_declaration_transfer' ||
      //         item === 'dic_domestic' ||
      //         item === 'dic_domestic_six' ||
      //         item === 'dic_exemption_mode' ||
      //         item === 'dic_exports_at_hui' ||
      //         item === 'dic_origin_area' ||
      //         item === 'dic_transport_mode' ||
      //         item === 'dic_permit_type_i' ||
      //         item === 'dic_permit_type_e' ||
      //         item === 'dic_wrap_type'
      //       ) {
      //         name = 'cn_name';
      //       } else if (item === 'dic_country_code') {
      //         obj.num = x.abbr;
      //       } else if (item === 'dic_currency_code') {
      //         name = 'cn_name';
      //         obj.num = x.abbr;
      //       } else if (item === 'dic_exemption_nature' || item === 'dic_inspection_quarantine') {
      //         name = 'name_short';
      //       }
      //       obj.code = x[code];
      //       obj.name = x[name];
      //       return obj;
      //     });
      //     allSource[item] = list;
      //   });
      //   storage.set('GLOBAL_DICTIONARY_ALL_SOURCE', allSource);
      // }
    }
  }
});
