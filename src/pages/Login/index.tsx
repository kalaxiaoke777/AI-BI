import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { loginRequest } from '../../redux/actions/userActions';
import './index.scss';

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { loading, error, isAuthenticated } = useAppSelector(state => state.user);

  // 监听登录状态变化
  useEffect(() => {
    if (submitted) {
      if (error) {
        message.error('登录失败，请检查用户名和密码');
        setSubmitted(false);
      } else if (isAuthenticated && !loading) {
        // 登录成功后跳转到首页
        navigate('/');
        message.success('登录成功');
        setSubmitted(false);
      }
    }
  }, [error, loading, isAuthenticated, navigate, submitted]);

  const onFinish = (values: any) => {
    setSubmitted(true);
    dispatch(loginRequest(values));
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src="/image.png" alt="基金理财平台" className="login-image" />
      </div>
      <div className="login-form-section">
        <Card className="login-card" title={<Title level={2} className="login-title">基金理财平台</Title>}>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
              label="用户名"
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入用户名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
              label="密码"
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button" size="large" loading={loading}>
                登录
              </Button>
            </Form.Item>

            <Form.Item className="login-footer">
              <Space orientation="vertical" size="small" style={{ display: 'flex' }}>
                <span>还没有账号？ <Link to="/register">立即注册</Link></span>
                <span>忘记密码？ <a href="#">点击找回</a></span>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
