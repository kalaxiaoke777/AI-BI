import type { FundFilters } from '../../types/fund';

// Action Types
export const FETCH_FUNDS_REQUEST = 'FETCH_FUNDS_REQUEST';
export const FETCH_FUNDS_SUCCESS = 'FETCH_FUNDS_SUCCESS';
export const FETCH_FUNDS_FAILURE = 'FETCH_FUNDS_FAILURE';

export const FETCH_FUND_DETAIL_REQUEST = 'FETCH_FUND_DETAIL_REQUEST';
export const FETCH_FUND_DETAIL_SUCCESS = 'FETCH_FUND_DETAIL_SUCCESS';
export const FETCH_FUND_DETAIL_FAILURE = 'FETCH_FUND_DETAIL_FAILURE';

export const FETCH_FUND_GROWTH_REQUEST = 'FETCH_FUND_GROWTH_REQUEST';
export const FETCH_FUND_GROWTH_SUCCESS = 'FETCH_FUND_GROWTH_SUCCESS';
export const FETCH_FUND_GROWTH_FAILURE = 'FETCH_FUND_GROWTH_FAILURE';

export const FETCH_FUND_COMPANIES_REQUEST = 'FETCH_FUND_COMPANIES_REQUEST';
export const FETCH_FUND_COMPANIES_SUCCESS = 'FETCH_FUND_COMPANIES_SUCCESS';
export const FETCH_FUND_COMPANIES_FAILURE = 'FETCH_FUND_COMPANIES_FAILURE';

export const FETCH_FUND_COMPANY_DETAIL_REQUEST = 'FETCH_FUND_COMPANY_DETAIL_REQUEST';
export const FETCH_FUND_COMPANY_DETAIL_SUCCESS = 'FETCH_FUND_COMPANY_DETAIL_SUCCESS';
export const FETCH_FUND_COMPANY_DETAIL_FAILURE = 'FETCH_FUND_COMPANY_DETAIL_FAILURE';

export const FETCH_COMPANY_FUNDS_REQUEST = 'FETCH_COMPANY_FUNDS_REQUEST';
export const FETCH_COMPANY_FUNDS_SUCCESS = 'FETCH_COMPANY_FUNDS_SUCCESS';
export const FETCH_COMPANY_FUNDS_FAILURE = 'FETCH_COMPANY_FUNDS_FAILURE';

// Action Creators

// 获取基金列表
export const fetchFundsRequest = (payload?: FundFilters) => ({
  type: FETCH_FUNDS_REQUEST,
  payload,
});

export const fetchFundsSuccess = (payload: any) => ({
  type: FETCH_FUNDS_SUCCESS,
  payload,
});

export const fetchFundsFailure = (error: string) => ({
  type: FETCH_FUNDS_FAILURE,
  payload: error,
});

// 获取基金详情
export const fetchFundDetailRequest = (payload: number) => ({
  type: FETCH_FUND_DETAIL_REQUEST,
  payload,
});

export const fetchFundDetailSuccess = (payload: any) => ({
  type: FETCH_FUND_DETAIL_SUCCESS,
  payload,
});

export const fetchFundDetailFailure = (error: string) => ({
  type: FETCH_FUND_DETAIL_FAILURE,
  payload: error,
});

// 获取基金历史涨幅
export const fetchFundGrowthRequest = (payload: number) => ({
  type: FETCH_FUND_GROWTH_REQUEST,
  payload,
});

export const fetchFundGrowthSuccess = (payload: any) => ({
  type: FETCH_FUND_GROWTH_SUCCESS,
  payload,
});

export const fetchFundGrowthFailure = (error: string) => ({
  type: FETCH_FUND_GROWTH_FAILURE,
  payload: error,
});

// 获取基金公司列表
export const fetchFundCompaniesRequest = () => ({
  type: FETCH_FUND_COMPANIES_REQUEST,
});

export const fetchFundCompaniesSuccess = (payload: any) => ({
  type: FETCH_FUND_COMPANIES_SUCCESS,
  payload,
});

export const fetchFundCompaniesFailure = (error: string) => ({
  type: FETCH_FUND_COMPANIES_FAILURE,
  payload: error,
});

// 获取基金公司详情
export const fetchFundCompanyDetailRequest = (payload: number) => ({
  type: FETCH_FUND_COMPANY_DETAIL_REQUEST,
  payload,
});

export const fetchFundCompanyDetailSuccess = (payload: any) => ({
  type: FETCH_FUND_COMPANY_DETAIL_SUCCESS,
  payload,
});

export const fetchFundCompanyDetailFailure = (error: string) => ({
  type: FETCH_FUND_COMPANY_DETAIL_FAILURE,
  payload: error,
});

// 获取基金公司发行的基金列表
export const fetchCompanyFundsRequest = (payload: number) => ({
  type: FETCH_COMPANY_FUNDS_REQUEST,
  payload,
});

export const fetchCompanyFundsSuccess = (payload: any) => ({
  type: FETCH_COMPANY_FUNDS_SUCCESS,
  payload,
});

export const fetchCompanyFundsFailure = (error: string) => ({
  type: FETCH_COMPANY_FUNDS_FAILURE,
  payload: error,
});
