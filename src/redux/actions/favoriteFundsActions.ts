// Action Types
export const FETCH_FAVORITE_FUNDS_REQUEST = 'FETCH_FAVORITE_FUNDS_REQUEST';
export const FETCH_FAVORITE_FUNDS_SUCCESS = 'FETCH_FAVORITE_FUNDS_SUCCESS';
export const FETCH_FAVORITE_FUNDS_FAILURE = 'FETCH_FAVORITE_FUNDS_FAILURE';

export const ADD_FAVORITE_FUND_REQUEST = 'ADD_FAVORITE_FUND_REQUEST';
export const ADD_FAVORITE_FUND_SUCCESS = 'ADD_FAVORITE_FUND_SUCCESS';
export const ADD_FAVORITE_FUND_FAILURE = 'ADD_FAVORITE_FUND_FAILURE';

export const REMOVE_FAVORITE_FUND_REQUEST = 'REMOVE_FAVORITE_FUND_REQUEST';
export const REMOVE_FAVORITE_FUND_SUCCESS = 'REMOVE_FAVORITE_FUND_SUCCESS';
export const REMOVE_FAVORITE_FUND_FAILURE = 'REMOVE_FAVORITE_FUND_FAILURE';

// Action Creators

// 获取自选基金列表
export const fetchFavoriteFundsRequest = () => ({
  type: FETCH_FAVORITE_FUNDS_REQUEST,
});

export const fetchFavoriteFundsSuccess = (payload: any) => ({
  type: FETCH_FAVORITE_FUNDS_SUCCESS,
  payload,
});

export const fetchFavoriteFundsFailure = (error: string) => ({
  type: FETCH_FAVORITE_FUNDS_FAILURE,
  payload: error,
});

// 添加自选基金
export const addFavoriteFundRequest = (payload: { fund_id: number }) => ({
  type: ADD_FAVORITE_FUND_REQUEST,
  payload,
});

export const addFavoriteFundSuccess = (payload: any) => ({
  type: ADD_FAVORITE_FUND_SUCCESS,
  payload,
});

export const addFavoriteFundFailure = (error: string) => ({
  type: ADD_FAVORITE_FUND_FAILURE,
  payload: error,
});

// 删除自选基金
export const removeFavoriteFundRequest = (payload: number) => ({
  type: REMOVE_FAVORITE_FUND_REQUEST,
  payload,
});

export const removeFavoriteFundSuccess = (payload: number) => ({
  type: REMOVE_FAVORITE_FUND_SUCCESS,
  payload,
});

export const removeFavoriteFundFailure = (error: string) => ({
  type: REMOVE_FAVORITE_FUND_FAILURE,
  payload: error,
});
