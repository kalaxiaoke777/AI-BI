import React from 'react';
import { Card, Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

const TransactionHistory: React.FC = () => {
  return (
    <div className="transaction-history-container">
      <Card className="transaction-history-card">
        <Title level={2}>交易记录</Title>
        <div className="placeholder-content">
          <p>交易记录页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default TransactionHistory;