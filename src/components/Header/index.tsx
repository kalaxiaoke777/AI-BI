import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, FundOutlined, BarChartOutlined, StarOutlined, WalletOutlined, HistoryOutlined, LineChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './index.scss';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState('funds');

  // 模拟用户信息
  const userInfo = {
    username: '用户123',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };

  // 根据当前路由设置菜单选中状态
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/funds')) {
      setCurrent('funds');
    } else if (path.startsWith('/companies')) {
      setCurrent('companies');
    } else if (path.startsWith('/query')) {
      setCurrent('query');
    } else if (path.startsWith('/rank')) {
      setCurrent('rank');
    } else if (path.startsWith('/index')) {
      setCurrent('index');
    }
  }, [location.pathname]);

  // 处理菜单项点击
  const handleMenuClick = (e: any) => {
    setCurrent(e.key);
  };

  // 处理退出登录
  const handleLogout = () => {
    // 清除token
    localStorage.removeItem('token');
    // 重定向到登录页
    navigate('/login');
  };

  // 用户下拉菜单
  const userMenu = (
    <Menu 
      onClick={({ key }) => {
        if (key === 'logout') {
          handleLogout();
        } else {
          navigate(key);
        }
      }}
      items={[
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
      ]}
    />
  );

  return (
    <AntHeader className="header">
      <div className="logo">
        <Link to="/">
          <FundOutlined className="logo-icon" /> 
          <span className="logo-text">基金理财</span>
        </Link>
      </div>
      
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[current]}
        onClick={handleMenuClick}
        className="nav-menu"
        items={[
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

        ]}
      />
      
      <div className="user-info">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button type="text" className="user-button">
            <Avatar src={userInfo.avatar} icon={<UserOutlined />} />
            <span className="username">{userInfo.username}</span>
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;