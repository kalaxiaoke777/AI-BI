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

// 用户管理相关Action Types
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

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

// 用户管理相关Action Creators

// 获取用户列表
export const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

export const getUsersSuccess = (payload: any) => ({
  type: GET_USERS_SUCCESS,
  payload,
});

export const getUsersFailure = (error: string) => ({
  type: GET_USERS_FAILURE,
  payload: error,
});

// 获取单个用户
export const getUserRequest = (id: number) => ({
  type: GET_USER_REQUEST,
  payload: id,
});

export const getUserSuccess = (payload: any) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserFailure = (error: string) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

// 更新用户
export const updateUserRequest = (id: number, payload: any) => ({
  type: UPDATE_USER_REQUEST,
  payload: { id, ...payload },
});

export const updateUserSuccess = (payload: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const updateUserFailure = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

// 删除用户
export const deleteUserRequest = (id: number) => ({
  type: DELETE_USER_REQUEST,
  payload: id,
});

export const deleteUserSuccess = (id: number) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});

export const deleteUserFailure = (error: string) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});
