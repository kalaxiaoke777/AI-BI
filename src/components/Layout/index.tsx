import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import styles from './index.module.scss';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Header />
      
      <Content className={styles.content}>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
