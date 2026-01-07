// Action Types
export const FETCH_HOLDINGS_REQUEST = 'FETCH_HOLDINGS_REQUEST';
export const FETCH_HOLDINGS_SUCCESS = 'FETCH_HOLDINGS_SUCCESS';
export const FETCH_HOLDINGS_FAILURE = 'FETCH_HOLDINGS_FAILURE';

export const PURCHASE_FUND_REQUEST = 'PURCHASE_FUND_REQUEST';
export const PURCHASE_FUND_SUCCESS = 'PURCHASE_FUND_SUCCESS';
export const PURCHASE_FUND_FAILURE = 'PURCHASE_FUND_FAILURE';

export const REDEEM_FUND_REQUEST = 'REDEEM_FUND_REQUEST';
export const REDEEM_FUND_SUCCESS = 'REDEEM_FUND_SUCCESS';
export const REDEEM_FUND_FAILURE = 'REDEEM_FUND_FAILURE';

export const FETCH_TRANSACTIONS_REQUEST = 'FETCH_TRANSACTIONS_REQUEST';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';

export const FETCH_TOTAL_PROFIT_REQUEST = 'FETCH_TOTAL_PROFIT_REQUEST';
export const FETCH_TOTAL_PROFIT_SUCCESS = 'FETCH_TOTAL_PROFIT_SUCCESS';
export const FETCH_TOTAL_PROFIT_FAILURE = 'FETCH_TOTAL_PROFIT_FAILURE';

// Action Creators

// 获取持有基金列表
export const fetchHoldingsRequest = () => ({
  type: FETCH_HOLDINGS_REQUEST,
});

export const fetchHoldingsSuccess = (payload: any) => ({
  type: FETCH_HOLDINGS_SUCCESS,
  payload,
});

export const fetchHoldingsFailure = (error: string) => ({
  type: FETCH_HOLDINGS_FAILURE,
  payload: error,
});

// 购买基金
export const purchaseFundRequest = (payload: { fund_code: string; amount: number }) => ({
  type: PURCHASE_FUND_REQUEST,
  payload,
});

export const purchaseFundSuccess = (payload: any) => ({
  type: PURCHASE_FUND_SUCCESS,
  payload,
});

export const purchaseFundFailure = (error: string) => ({
  type: PURCHASE_FUND_FAILURE,
  payload: error,
});

// 赎回基金
export const redeemFundRequest = (payload: { holding_id: number; shares: number }) => ({
  type: REDEEM_FUND_REQUEST,
  payload,
});

export const redeemFundSuccess = (payload: any) => ({
  type: REDEEM_FUND_SUCCESS,
  payload,
});

export const redeemFundFailure = (error: string) => ({
  type: REDEEM_FUND_FAILURE,
  payload: error,
});

// 获取交易记录
export const fetchTransactionsRequest = () => ({
  type: FETCH_TRANSACTIONS_REQUEST,
});

export const fetchTransactionsSuccess = (payload: any) => ({
  type: FETCH_TRANSACTIONS_SUCCESS,
  payload,
});

export const fetchTransactionsFailure = (error: string) => ({
  type: FETCH_TRANSACTIONS_FAILURE,
  payload: error,
});

// 获取总收益
export const fetchTotalProfitRequest = () => ({
  type: FETCH_TOTAL_PROFIT_REQUEST,
});

export const fetchTotalProfitSuccess = (payload: any) => ({
  type: FETCH_TOTAL_PROFIT_SUCCESS,
  payload,
});

export const fetchTotalProfitFailure = (error: string) => ({
  type: FETCH_TOTAL_PROFIT_FAILURE,
  payload: error,
});
