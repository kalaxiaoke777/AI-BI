import React from 'react';
import { Card, Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const TransactionHistory: React.FC = () => {
  return (
    <div className={styles.transactionHistoryContainer}>
      <Card className={styles.transactionHistoryCard}>
        <Title level={2}>交易记录</Title>
        <div className={styles.placeholderContent}>
          <p>交易记录页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default TransactionHistory;