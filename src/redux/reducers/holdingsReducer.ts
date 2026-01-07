// 持有基金Reducer

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

// 持有基金状态类型
export interface Holding {
  id: number;
  user_id: number;
  fund_id: number;
  fund_code: string;
  fund_name: string;
  shares: number;
  purchase_price: number;
  current_price: number;
  total_cost: number;
  current_value: number;
  daily_profit: number;
  holding_profit: number;
  holding_profit_rate: number;
  is_holding: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  fund_id: number;
  fund_code: string;
  fund_name: string;
  transaction_type: string;
  shares: number;
  transaction_price: number;
  transaction_amount: number;
  transaction_time: string;
  status: string;
  created_at: string;
}

export interface TotalProfit {
  total_holding_value: number;
  total_cost: number;
  total_holding_profit: number;
  total_holding_profit_rate: number;
  total_daily_profit: number;
  total_transaction_count: number;
  total_holding_count: number;
}

export interface HoldingsState {
  list: Holding[];
  transactions: Transaction[];
  totalProfit: TotalProfit | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: HoldingsState = {
  list: [],
  transactions: [],
  totalProfit: null,
  loading: false,
  error: null,
};

// Reducer函数
const holdingsReducer = (state = initialState, action: any): HoldingsState => {
  switch (action.type) {
    case FETCH_HOLDINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_HOLDINGS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_HOLDINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PURCHASE_FUND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PURCHASE_FUND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case PURCHASE_FUND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REDEEM_FUND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REDEEM_FUND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case REDEEM_FUND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TOTAL_PROFIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOTAL_PROFIT_SUCCESS:
      return {
        ...state,
        totalProfit: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_TOTAL_PROFIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default holdingsReducer;
