import type { UserState } from '../../types/user';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
} from '../actions/userActions';

// 初始状态
const initialState: UserState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  userInfo: null,
  loading: false,
  error: null,
};

// 用户Reducer
const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.access_token,
        userInfo: action.payload.user_info,
        loading: false,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userInfo: null,
        loading: false,
        error: null,
      };
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
