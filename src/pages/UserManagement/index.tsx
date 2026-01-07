import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Typography, Modal, Form, Input, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getUsersRequest, deleteUserRequest, updateUserRequest } from '../../redux/actions/userActions';
import styles from './index.module.scss';

const { Title } = Typography;

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector(state => state.user);
  
  // 模态框状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  // 获取用户列表
  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  // 处理新增/编辑用户
  const handleUserSubmit = (values: any) => {
    if (editingUser) {
      // 编辑用户
      dispatch(updateUserRequest(editingUser.id, values));
    } else {
      // 新增用户
    }
    setIsModalVisible(false);
  };

  // 处理删除用户
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUserRequest(id));
  };

  return (
    <div className={styles.userManagementContainer}>
      <Card className={styles.userManagementCard}>
        <div className={styles.userManagementHeader}>
          <Title level={2}>用户管理</Title>
          <div className={styles.userManagementActions}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setIsModalVisible(true);
            }}>
              新增用户
            </Button>
          </div>
        </div>
        <Table
          dataSource={users || []}
          columns={[
            {
              title: '用户名',
              dataIndex: 'username',
            },
            {
              title: '邮箱',
              dataIndex: 'email',
            },
            {
              title: '角色',
              dataIndex: 'role',
            },
            {
              title: '创建时间',
              dataIndex: 'created_at',
            },
            {
              title: '操作',
              render: (_, record) => (
                <Space size="middle">
                  <Button type="link" icon={<EditOutlined />} onClick={() => {
                    setEditingUser(record);
                    form.setFieldsValue(record);
                    setIsModalVisible(true);
                  }}>
                    编辑
                  </Button>
                  <Button type="link" danger icon={<DeleteOutlined />} onClick={() => {
                    handleDeleteUser(record.id);
                  }}>
                    删除
                  </Button>
                </Space>
              ),
            },
          ]}
          loading={loading}
          rowKey="id"
        />
        
        {/* 新增/编辑模态框 */}
        <Modal
          title={editingUser ? '编辑用户' : '新增用户'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUserSubmit}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
              label="用户名"
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '请输入邮箱!' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
              label="邮箱"
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: !editingUser, message: '请输入密码!' }]}
              label="密码"
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingUser ? '更新' : '创建'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default UserManagement;