import type { FundsState } from '../../types/fund';
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
} from '../actions/fundActions';

// 初始状态
const initialState: FundsState = {
  list: [],
  detail: null,
  growth: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 0,
  },
  filters: {},
};

// 基金Reducer
const fundsReducer = (state = initialState, action: any): FundsState => {
  switch (action.type) {
    case FETCH_FUNDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        filters: action.payload || {},
      };
    case FETCH_FUNDS_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        error: null,
        pagination: {
          page: action.payload.page,
          page_size: action.payload.page_size,
          total: action.payload.total,
          total_pages: action.payload.total_pages,
        },
      };
    case FETCH_FUNDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FUND_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FUND_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_FUND_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FUND_GROWTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FUND_GROWTH_SUCCESS:
      return {
        ...state,
        growth: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_FUND_GROWTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fundsReducer;
