import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, token, userInfo } = useAppSelector(state => state.user);
  const location = useLocation();
  
  // 检查用户是否已登录且有token
  const isLoggedIn = isAuthenticated && token;
  
  if (!isLoggedIn) {
    // 未登录，重定向到登录页面
    return <Navigate to="/login" replace />;
  }
  
  // 检查是否需要admin权限
  const requiresAdmin = location.pathname.startsWith('/users');
  if (requiresAdmin && userInfo?.role !== 'admin') {
    // 需要admin权限但当前用户不是admin，重定向到首页
    return <Navigate to="/index" replace />;
  }
  
  // 已登录且权限符合要求，渲染子组件
  return <Outlet />;
};

export default PrivateRoute;