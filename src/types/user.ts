// 用户信息类型
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

// 登录请求参数类型
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应参数类型
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_info: UserInfo;
}

// 注册请求参数类型
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
}

// 注册响应参数类型
export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// 用户状态类型
export interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  users: UserInfo[] | null;
  loading: boolean;
  error: string | null;
}
