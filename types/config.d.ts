import { RouteHistoryModeEnum, RoutePermissionModeEnum } from '/@/enums/appEnum';

export interface ProjectSetting {
  routeHistoryMode: RouteHistoryModeEnum;
  routePermissionMode: RoutePermissionModeEnum;
  multiplePlatformMode: boolean;
  showPageTitleSuffix: boolean;
}
