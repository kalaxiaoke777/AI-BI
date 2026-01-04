import React from 'react';
import { Card, Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

const Holdings: React.FC = () => {
  return (
    <div className="holdings-container">
      <Card className="holdings-card">
        <Title level={2}>持有基金</Title>
        <div className="placeholder-content">
          <p>持有基金页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default Holdings;