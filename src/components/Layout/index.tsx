import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import './index.scss';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Header />
      
      <Content className="content">
        <div className="main-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
