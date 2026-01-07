import { call, put, takeLatest, all } from 'redux-saga/effects';
import api from '../../services/api';
import {
  FETCH_HOLDINGS_REQUEST,
  FETCH_HOLDINGS_SUCCESS,
  FETCH_HOLDINGS_FAILURE,
  PURCHASE_FUND_REQUEST,
  PURCHASE_FUND_SUCCESS,
  PURCHASE_FUND_FAILURE,
  REDEEM_FUND_REQUEST,
  REDEEM_FUND_SUCCESS,
  REDEEM_FUND_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TOTAL_PROFIT_REQUEST,
  FETCH_TOTAL_PROFIT_SUCCESS,
  FETCH_TOTAL_PROFIT_FAILURE,
} from '../actions/holdingsActions';

// 获取持有基金列表saga
export function* fetchHoldingsSaga() {
  try {
    const response: unknown = yield call(api.get, '/ss-fund/holdings');
    yield put({ type: FETCH_HOLDINGS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_HOLDINGS_FAILURE, payload: error.message || '获取持有基金列表失败' });
  }
}

// 购买基金saga
export function* purchaseFundSaga(action: any) {
  try {
    const response: unknown = yield call(api.post, '/ss-fund/holdings/purchase', action.payload);
    yield put({ type: PURCHASE_FUND_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: PURCHASE_FUND_FAILURE, payload: error.message || '购买基金失败' });
  }
}

// 赎回基金saga
export function* redeemFundSaga(action: any) {
  try {
    const response: unknown = yield call(api.post, '/ss-fund/holdings/redeem', action.payload);
    yield put({ type: REDEEM_FUND_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: REDEEM_FUND_FAILURE, payload: error.message || '赎回基金失败' });
  }
}

// 获取交易记录saga
export function* fetchTransactionsSaga() {
  try {
    const response: unknown = yield call(api.get, '/ss-fund/transactions');
    yield put({ type: FETCH_TRANSACTIONS_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_TRANSACTIONS_FAILURE, payload: error.message || '获取交易记录失败' });
  }
}

// 获取总收益saga
export function* fetchTotalProfitSaga() {
  try {
    const response: unknown = yield call(api.get, '/ss-fund/total-profit');
    yield put({ type: FETCH_TOTAL_PROFIT_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: FETCH_TOTAL_PROFIT_FAILURE, payload: error.message || '获取总收益失败' });
  }
}

// 监听action
export function* watchHoldingsSaga() {
  yield all([
    takeLatest(FETCH_HOLDINGS_REQUEST, fetchHoldingsSaga),
    takeLatest(PURCHASE_FUND_REQUEST, purchaseFundSaga),
    takeLatest(REDEEM_FUND_REQUEST, redeemFundSaga),
    takeLatest(FETCH_TRANSACTIONS_REQUEST, fetchTransactionsSaga),
    takeLatest(FETCH_TOTAL_PROFIT_REQUEST, fetchTotalProfitSaga),
  ]);
}

export default watchHoldingsSaga;
