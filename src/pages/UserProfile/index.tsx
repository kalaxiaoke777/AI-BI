import React from 'react';
import { Card, Row, Col, Descriptions, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../hooks/useRedux';
import styles from './index.module.scss';

const UserProfile: React.FC = () => {
  // 从Redux获取用户信息
  const { userInfo } = useAppSelector(state => state.user);

  return (
    <div className={styles.userProfileContainer}>
      <Card className={styles.userProfileCard}>
        <Row gutter={24}>
          <Col span={6}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarLarge}>
                <UserOutlined style={{ fontSize: 64, color: '#1890ff' }} />
              </div>
              <div className={styles.usernameLarge}>{userInfo?.username}</div>
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                className={styles.editButton}
              >
                编辑资料
              </Button>
            </div>
          </Col>
          <Col span={18}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="用户ID">{userInfo?.id || '-'}</Descriptions.Item>
              <Descriptions.Item label="用户名">{userInfo?.username || '-'}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{userInfo?.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="角色">{userInfo?.role === 'admin' ? '管理员' : '普通用户'}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{userInfo?.created_at || '-'}</Descriptions.Item>
              <Descriptions.Item label="最后登录">{userInfo?.last_login || '-'}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;