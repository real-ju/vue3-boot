export interface LoginModel {
  username: string;
  password: string;
  grant_type: string;
  captchaId?: string;
  captchaCode?: string;
}
export interface CheckUserTokenModel {
  token: string;
  source: string;
}
export interface UserLogoutModel {
  token: string;
  source: string;
}
export interface SetCurrentOrganizationModel {
  orgId: string;
  orgName: string;
}
