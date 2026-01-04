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
  GET_USERS_REQUEST, 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILURE, 
  GET_USER_REQUEST, 
  GET_USER_SUCCESS, 
  GET_USER_FAILURE, 
  UPDATE_USER_REQUEST, 
  UPDATE_USER_SUCCESS, 
  UPDATE_USER_FAILURE, 
  DELETE_USER_REQUEST, 
  DELETE_USER_SUCCESS, 
  DELETE_USER_FAILURE, 
} from '../actions/userActions';

// 初始状态
const initialState: UserState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  userInfo: null,
  users: null,
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
    // 用户管理相关处理
    case GET_USERS_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users ? state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ) : null,
        loading: false,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users ? state.users.filter(user => user.id !== action.payload) : null,
        loading: false,
        error: null,
      };
    case GET_USERS_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
