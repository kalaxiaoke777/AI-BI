import React from 'react';
import { Card, Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const Holdings: React.FC = () => {
  return (
    <div className={styles['holdings-container']}>
      <Card className={styles['holdings-card']}>
        <Title level={2}>持有基金</Title>
        <div className={styles['placeholder-content']}>
          <p>持有基金页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default Holdings;