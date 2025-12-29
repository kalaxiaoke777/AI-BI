import { call, put, takeLatest, all } from 'redux-saga/effects';
import api from '../../services/api';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
} from '../actions/userActions';
import type { LoginRequest, RegisterRequest } from '../../types/user';

// 登录saga
export function* loginSaga(action: any) {
  try {
    const { payload }: { payload: LoginRequest } = action;
    const response = yield call(api.post, '/user/login', payload);
    yield put({ type: LOGIN_SUCCESS, payload: response });
    // 将token存储到localStorage
    localStorage.setItem('token', response.access_token);
  } catch (error: any) {
    yield put({ type: LOGIN_FAILURE, payload: error.response.data.detail || '登录失败' });
  }
}

// 注册saga
export function* registerSaga(action: any) {
  try {
    const { payload }: { payload: RegisterRequest } = action;
    const response = yield call(api.post, '/user/register', payload);
    yield put({ type: REGISTER_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: REGISTER_FAILURE, payload: error.response.data.detail || '注册失败' });
  }
}

// 获取当前用户信息saga
export function* getCurrentUserSaga() {
  try {
    const response = yield call(api.get, '/user/me');
    yield put({ type: GET_CURRENT_USER_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: GET_CURRENT_USER_FAILURE, payload: error.response.data.detail || '获取用户信息失败' });
  }
}

// 监听action
export function* watchUserSaga() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(REGISTER_REQUEST, registerSaga),
    takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUserSaga),
  ]);
}

export default watchUserSaga;
