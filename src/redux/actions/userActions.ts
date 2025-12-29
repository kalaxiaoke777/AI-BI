import type { LoginRequest, RegisterRequest } from '../../types/user';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT = 'LOGOUT';

export const GET_CURRENT_USER_REQUEST = 'GET_CURRENT_USER_REQUEST';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_FAILURE = 'GET_CURRENT_USER_FAILURE';

// Action Creators

// 登录
export const loginRequest = (payload: LoginRequest) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// 注册
export const registerRequest = (payload: RegisterRequest) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (payload: any) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

// 退出登录
export const logout = () => ({
  type: LOGOUT,
});

// 获取当前用户信息
export const getCurrentUserRequest = () => ({
  type: GET_CURRENT_USER_REQUEST,
});

export const getCurrentUserSuccess = (payload: any) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload,
});

export const getCurrentUserFailure = (error: string) => ({
  type: GET_CURRENT_USER_FAILURE,
  payload: error,
});
