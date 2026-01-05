import { call, put, takeLatest, all } from 'redux-saga/effects';
import api from '../../services/api';
import {
  FETCH_FUNDS_REQUEST,
  FETCH_FUNDS_SUCCESS,
  FETCH_FUNDS_FAILURE,
  FETCH_FUND_DETAIL_REQUEST,
  FETCH_FUND_DETAIL_SUCCESS,
  FETCH_FUND_DETAIL_FAILURE,
  FETCH_FUND_GROWTH_REQUEST,
  FETCH_FUND_GROWTH_SUCCESS,
  FETCH_FUND_GROWTH_FAILURE,
  FETCH_FUND_COMPANIES_REQUEST,
  FETCH_FUND_COMPANIES_SUCCESS,
  FETCH_FUND_COMPANIES_FAILURE,
  FETCH_FUND_COMPANY_DETAIL_REQUEST,
  FETCH_FUND_COMPANY_DETAIL_SUCCESS,
  FETCH_FUND_COMPANY_DETAIL_FAILURE,
  FETCH_COMPANY_FUNDS_REQUEST,
  FETCH_COMPANY_FUNDS_SUCCESS,
  FETCH_COMPANY_FUNDS_FAILURE,
} from '../actions/fundActions';

// 获取基金列表saga
export function* fetchFundsSaga(action: any) {
  try {
    const response: unknown = yield call(api.get, '/query/fund/basic', { params: action.payload });
    yield put({ type: FETCH_FUNDS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_FUNDS_FAILURE, payload: error.message || '获取基金列表失败' });
  }
}

// 获取基金详情saga
export function* fetchFundDetailSaga(action: any) {
  try {
    const response: unknown = yield call(api.get, `/query/fund/basic/${action.payload}`);
    yield put({ type: FETCH_FUND_DETAIL_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_FUND_DETAIL_FAILURE, payload: error.message || '获取基金详情失败' });
  }
}

// 获取基金历史涨幅saga
export function* fetchFundGrowthSaga(action: any) {
  try {
    const response: unknown = yield call(api.get, `/fund/${action.payload}/growth`);
    yield put({ type: FETCH_FUND_GROWTH_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_FUND_GROWTH_FAILURE, payload: error.message || '获取基金历史涨幅失败' });
  }
}

// 获取基金公司列表saga
export function* fetchFundCompaniesSaga() {
  try {
    const response: unknown = yield call(api.get, '/query/fund/company');
    yield put({ type: FETCH_FUND_COMPANIES_SUCCESS, payload: (response as { data: any }).data });
  } catch (error: any) {
    yield put({ type: FETCH_FUND_COMPANIES_FAILURE, payload: error.message || '获取基金公司列表失败' });
  }
}

// 获取基金公司详情saga
export function* fetchFundCompanyDetailSaga(action: any) {
  try {
    const response: unknown = yield call(api.get, `/query/fund/company/${action.payload}`);
    yield put({ type: FETCH_FUND_COMPANY_DETAIL_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_FUND_COMPANY_DETAIL_FAILURE, payload: error.message || '获取基金公司详情失败' });
  }
}

// 获取基金公司发行的基金列表saga
export function* fetchCompanyFundsSaga(action: any) {
  try {
    const response: unknown = yield call(api.get, `/fund/companies/${action.payload}/funds`);
    yield put({ type: FETCH_COMPANY_FUNDS_SUCCESS, payload: (response as { data: any }).data });
  } catch (error: any) {
    yield put({ type: FETCH_COMPANY_FUNDS_FAILURE, payload: error.message || '获取基金公司发行的基金列表失败' });
  }
}

// 监听action
export function* watchFundSaga() {
  yield all([
    takeLatest(FETCH_FUNDS_REQUEST, fetchFundsSaga),
    takeLatest(FETCH_FUND_DETAIL_REQUEST, fetchFundDetailSaga),
    takeLatest(FETCH_FUND_GROWTH_REQUEST, fetchFundGrowthSaga),
    takeLatest(FETCH_FUND_COMPANIES_REQUEST, fetchFundCompaniesSaga),
    takeLatest(FETCH_FUND_COMPANY_DETAIL_REQUEST, fetchFundCompanyDetailSaga),
    takeLatest(FETCH_COMPANY_FUNDS_REQUEST, fetchCompanyFundsSaga),
  ]);
}

export default watchFundSaga;
