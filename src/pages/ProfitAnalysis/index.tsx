import React from 'react';
import { Card, Typography } from 'antd';
import styles from './index.module.scss';

const { Title } = Typography;

const ProfitAnalysis: React.FC = () => {
  return (
    <div className={styles['profit-analysis-container']}>
      <Card className={styles['profit-analysis-card']}>
        <Title level={2}>收益分析</Title>
        <div className={styles['placeholder-content']}>
          <p>收益分析页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default ProfitAnalysis;