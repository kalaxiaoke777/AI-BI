import React from 'react';
import { Card, Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  return (
    <div className="user-profile-container">
      <Card className="user-profile-card">
        <Title level={2}>个人信息</Title>
        <div className="placeholder-content">
          <p>个人信息页面内容</p>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;