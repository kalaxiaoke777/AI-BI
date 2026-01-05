import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, FundOutlined, BarChartOutlined, StarOutlined, WalletOutlined, HistoryOutlined, LineChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { logout } from '../../redux/actions/userActions';
import styles from './index.module.scss';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('funds');
  const dispatch = useAppDispatch();
  
  // 从Redux获取用户信息
  const { userInfo, isAuthenticated } = useAppSelector(state => state.user);

  // 根据当前路由设置菜单选中状态
  useEffect(() => {
    const path = location.pathname;
    
    // 如果是用户相关路由，不高亮任何顶部导航项
    if (path.startsWith('/user/')) {
      setCurrent('');
    } else if (path.startsWith('/funds')) {
      setCurrent('funds');
    } else if (path.startsWith('/companies')) {
      setCurrent('companies');
    } else if (path.startsWith('/query')) {
      setCurrent('query');
    } else if (path.startsWith('/rank')) {
      setCurrent('rank');
    } else if (path.startsWith('/index')) {
      setCurrent('index');
    } else if (path.startsWith('/users')) {
      setCurrent('users');
    } else {
      setCurrent('index');
    }

  }, [location.pathname]);

  // 处理菜单项点击
  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
  };

  // 处理退出登录
  const handleLogout = () => {
    // 调用Redux退出登录action
    dispatch(logout());
    // 重定向到登录页
    navigate('/login');
  };

  // 构建导航菜单，根据用户角色显示或隐藏用户管理菜单
  const navItems = [
    {
      key: 'index',
      icon: <LineChartOutlined />,
      label: <Link to="/index">指数分析</Link>,
    },
    {
      key: 'funds',
      icon: <FundOutlined />,
      label: <Link to="/funds">基金列表</Link>,
    },
    {
      key: 'companies',
      icon: <FundOutlined />,
      label: <Link to="/companies">基金公司</Link>,
    },
    {
      key: 'query',
      icon: <BarChartOutlined />,
      label: <Link to="/query">基金查询</Link>,
    },
    {
      key: 'rank',
      icon: <BarChartOutlined />,
      label: <Link to="/rank">基金排行</Link>,
    },
  ];
  
  // 只有admin角色才显示用户管理菜单
  if (userInfo?.role === 'admin') {
    navItems.push({
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/users">用户管理</Link>,
    });
  }

  // 下拉菜单点击处理
  const handleDropdownMenuClick = (menuItem: any) => {
    const key = menuItem.key;
    console.log('Dropdown menu clicked:', key);
    
    if (key === 'logout') {
      handleLogout();
    } else {
      navigate(key);
    }
  };

  // 用户下拉菜单项
  const dropdownMenuItems = [
    {
      key: '/user/profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: '/user/favorites',
      icon: <StarOutlined />,
      label: '自选基金',
    },
    {
      key: '/user/holdings',
      icon: <WalletOutlined />,
      label: '持有基金',
    },
    {
      key: '/user/transactions',
      icon: <HistoryOutlined />,
      label: '交易记录',
    },
    {
      key: '/user/profit',
      icon: <BarChartOutlined />,
      label: '收益分析',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  
  return (
    <AntHeader className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <FundOutlined className={styles.logoIcon} /> 
          <span className={styles.logoText}>基金理财</span>
        </Link>
      </div>
      
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        onClick={handleMenuClick}
        className={styles['nav-menu']}
        items={navItems}
      />
      
      {isAuthenticated && userInfo && (
        <div className={styles['user-info']}>
          <Dropdown 
            menu={{ 
              items: dropdownMenuItems,
              onClick: handleDropdownMenuClick
            }} 
            trigger={['click']}
          >
            <Button type="text" className={styles['user-button']}>
              <Avatar icon={<UserOutlined />} />
              <span className={styles['username']}>{userInfo.username}</span>
            </Button>
          </Dropdown>
        </div>
      )}
      
      {!isAuthenticated && (
        <div className={styles['login-button']}>
          <Button type="text" onClick={() => navigate('/login')} className={styles['nav-login-button']}>
            <UserOutlined />
            <span>登录</span>
          </Button>
        </div>
      )}
    </AntHeader>
  );
};

export default Header;