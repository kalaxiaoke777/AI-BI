import api from '../api';
import type { LoginRequest, RegisterRequest } from '../../types/user';

// 用户API服务
export const userService = {
  // 登录
  login: (payload: LoginRequest) => api.post('/user/login', payload),
  
  // 注册
  register: (payload: RegisterRequest) => api.post('/user/register', payload),
  
  // 获取当前用户信息
  getCurrentUser: () => api.get('/user/me'),
  
  // 获取用户列表
  getUsers: () => api.get('/user/users'),
  
  // 获取单个用户
  getUser: (userId: number) => api.get(`/user/users/${userId}`),
  
  // 更新用户
  updateUser: (userId: number, payload: any) => api.put(`/user/users/${userId}`, payload),
  
  // 删除用户
  deleteUser: (userId: number) => api.delete(`/user/users/${userId}`),
};

export default userService;
