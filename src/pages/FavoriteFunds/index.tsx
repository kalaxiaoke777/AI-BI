import React from 'react';
import { Card, Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const FavoriteFunds: React.FC = () => {
  return (
    <div className={styles['favorite-funds-container']}>
      <Card className={styles['favorite-funds-card']}>
        <Title level={2}>自选基金</Title>
        <div className={styles['placeholder-content']}>
          <p>自选基金页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default FavoriteFunds;