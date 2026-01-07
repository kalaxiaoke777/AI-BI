import { call, put, takeLatest, all } from 'redux-saga/effects';
import api from '../../services/api';
import {
  FETCH_FAVORITE_FUNDS_REQUEST,
  FETCH_FAVORITE_FUNDS_SUCCESS,
  FETCH_FAVORITE_FUNDS_FAILURE,
  ADD_FAVORITE_FUND_REQUEST,
  ADD_FAVORITE_FUND_SUCCESS,
  ADD_FAVORITE_FUND_FAILURE,
  REMOVE_FAVORITE_FUND_REQUEST,
  REMOVE_FAVORITE_FUND_SUCCESS,
  REMOVE_FAVORITE_FUND_FAILURE,
} from '../actions/favoriteFundsActions';

// 获取自选基金列表saga
export function* fetchFavoriteFundsSaga() {
  try {
    const response: unknown = yield call(api.get, '/ss-fund/favorite-funds');
    yield put({ type: FETCH_FAVORITE_FUNDS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_FAVORITE_FUNDS_FAILURE, payload: error.message || '获取自选基金列表失败' });
  }
}

// 添加自选基金saga
export function* addFavoriteFundSaga(action: any) {
  try {
    const response: unknown = yield call(api.post, '/ss-fund/favorite-funds', action.payload);
    yield put({ type: ADD_FAVORITE_FUND_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: ADD_FAVORITE_FUND_FAILURE, payload: error.message || '添加自选基金失败' });
  }
}

// 删除自选基金saga
export function* removeFavoriteFundSaga(action: any) {
  try {
    yield call(api.delete, `/ss-fund/favorite-funds/${action.payload}`);
    yield put({ type: REMOVE_FAVORITE_FUND_SUCCESS, payload: action.payload });
  } catch (error: any) {
    yield put({ type: REMOVE_FAVORITE_FUND_FAILURE, payload: error.message || '删除自选基金失败' });
  }
}

// 监听action
export function* watchFavoriteFundsSaga() {
  yield all([
    takeLatest(FETCH_FAVORITE_FUNDS_REQUEST, fetchFavoriteFundsSaga),
    takeLatest(ADD_FAVORITE_FUND_REQUEST, addFavoriteFundSaga),
    takeLatest(REMOVE_FAVORITE_FUND_REQUEST, removeFavoriteFundSaga),
  ]);
}

export default watchFavoriteFundsSaga;
