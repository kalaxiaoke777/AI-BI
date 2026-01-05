import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { registerRequest } from '../../redux/actions/userActions';
import styles from './index.module.scss';

const { Title } = Typography;

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { loading, error } = useAppSelector(state => state.user);

  // 监听注册状态变化
  useEffect(() => {
    if (submitted) {
      if (error) {
        message.error(`${error}`);
        setSubmitted(false);
      } else if (!loading) {
        // 注册成功后跳转到登录页
        navigate('/login');
        message.success('注册成功，请登录');
        setSubmitted(false);
      }
    }
  }, [error, loading, navigate, submitted]);

  const onFinish = (values: any) => {
    setSubmitted(true);
    dispatch(registerRequest(values));
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerImageSection}>
        <img src="/image.png" alt="基金理财平台" className={styles.registerImage} />
      </div>
      <div className={styles.registerFormSection}>
        <Card className={styles.registerCard} title={<Title level={2} className={styles.registerTitle}>基金理财平台</Title>}>
          <Form
            name="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }, { min: 4, max: 20, message: '用户名长度必须在4-20个字符之间' }]}
              label="用户名"
            >
              <Input
                prefix={<UserOutlined className={styles.siteFormItemIcon} />}
                placeholder="请输入用户名"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
              label="邮箱"
            >
              <Input
                prefix={<MailOutlined className={styles.siteFormItemIcon} />}
                placeholder="请输入邮箱"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码长度必须至少6个字符' }]}
              label="密码"
            >
              <Input.Password
                prefix={<LockOutlined className={styles.siteFormItemIcon} />}
                type="password"
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致!'));
                  },
                }),
              ]}
              label="确认密码"
            >
              <Input.Password
                prefix={<LockOutlined className={styles.siteFormItemIcon} />}
                type="password"
                placeholder="请确认密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.registerButton} size="large" loading={loading}>
                注册
              </Button>
            </Form.Item>

            <Form.Item className={styles.registerFooter}>
              <Space orientation="vertical" size="small" style={{ display: 'flex' }}>
                <span>已有账号？ <Link to="/login">立即登录</Link></span>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
