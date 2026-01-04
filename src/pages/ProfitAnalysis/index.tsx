import React from 'react';
import { Card, Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

const ProfitAnalysis: React.FC = () => {
  return (
    <div className="profit-analysis-container">
      <Card className="profit-analysis-card">
        <Title level={2}>收益分析</Title>
        <div className="placeholder-content">
          <p>收益分析页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default ProfitAnalysis;