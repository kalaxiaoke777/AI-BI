import axios from 'axios';
import { message } from 'antd';
// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      // 将token添加到URL查询参数中
      config.params = {
        ...config.params,
        token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一处理错误
    if (error.response) {
      // 请求已发出，服务器返回状态码不在2xx范围内
      // console.error('API Error:', error.response.data.detail);
      switch (error.response.status) {
        case 401:
          // 未授权，清除token并重定向到登录页
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 400:
          // 请求参数错误
          console.error('请求参数错误');
          message.error(error.response.data.detail || '请求参数错误');
          break;
        case 403:
          // 禁止访问，权限不足
          message.error(error.response.data.detail || '请求参数错误');
          break;
        case 404:
          // 资源不存在
          message.error(error.response.data.detail || '请求参数错误');
          break;
        case 500:
          // 服务器内部错误
          console.error('服务器内部错误');
          message.error(error.response.data.detail || '请求参数错误');
          break;
        default:
          console.error('请求失败');
          message.error(error.response.data.detail || '请求参数错误');
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('网络错误，无法连接到服务器');
      message.error(error.response.data.detail || '网络错误，无法连接到服务器');
    } else {
      // 请求配置出错
      message.error(error.response.data.detail || '请求参数错误');
    }
    return Promise.reject(error);
  }
);

export default api;
