import type { CompaniesState } from '../../types/fund';
import {
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

// 初始状态
const initialState: CompaniesState = {
  list: [],
  detail: null,
  funds: [],
  loading: false,
  error: null,
};

// 基金公司Reducer
const companiesReducer = (state = initialState, action: any): CompaniesState => {
  switch (action.type) {
    case FETCH_FUND_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FUND_COMPANIES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_FUND_COMPANIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_FUND_COMPANY_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FUND_COMPANY_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_FUND_COMPANY_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COMPANY_FUNDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMPANY_FUNDS_SUCCESS:
      return {
        ...state,
        funds: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_COMPANY_FUNDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companiesReducer;
