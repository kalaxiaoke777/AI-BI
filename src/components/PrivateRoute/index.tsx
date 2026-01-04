import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, token } = useAppSelector(state => state.user);
  
  // 检查用户是否已登录且有token
  const isLoggedIn = isAuthenticated && token;
  
  if (!isLoggedIn) {
    // 未登录，重定向到登录页面
    return <Navigate to="/login" replace />;
  }
  
  // 已登录，渲染子组件
  return <Outlet />;
};

export default PrivateRoute;