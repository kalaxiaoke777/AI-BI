// 自选基金Reducer

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

// 自选基金状态类型
export interface FavoriteFund {
  id: number;
  user_id: number;
  fund_id: number;
  fund_code: string;
  fund_name: string;
  created_at: string;
}

export interface FavoriteFundsState {
  list: FavoriteFund[];
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: FavoriteFundsState = {
  list: [],
  loading: false,
  error: null,
};

// Reducer函数
const favoriteFundsReducer = (state = initialState, action: any): FavoriteFundsState => {
  switch (action.type) {
    case FETCH_FAVORITE_FUNDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FAVORITE_FUNDS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_FAVORITE_FUNDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_FAVORITE_FUND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_FAVORITE_FUND_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        error: null,
      };
    case ADD_FAVORITE_FUND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_FAVORITE_FUND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REMOVE_FAVORITE_FUND_SUCCESS:
      return {
        ...state,
        list: state.list.filter(fund => fund.id !== action.payload),
        loading: false,
        error: null,
      };
    case REMOVE_FAVORITE_FUND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteFundsReducer;
