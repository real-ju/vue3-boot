/* root */
export interface RootState {}

/* auth module */
export interface AuthState {
  isLogin: boolean;
  user: UserInfo | null;
  token: string | null;
}

interface UserInfo {
  platform?: {
    symbol: string;
  };
}
