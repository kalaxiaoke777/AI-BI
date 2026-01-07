import React, { useEffect } from 'react';
import { Card, Table, Button, message } from 'antd';
import { DeleteOutlined, FundOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchFavoriteFundsRequest, removeFavoriteFundRequest } from '../../redux/actions/favoriteFundsActions';
import styles from './index.module.scss';

const FavoriteFunds: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.favoriteFunds);

  useEffect(() => {
    dispatch(fetchFavoriteFundsRequest());
  }, [dispatch]);

  // 处理删除自选基金
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavoriteFundRequest(id));
    message.success('已从自选基金中删除');
  };

  // 表格列配置
  const columns = [
    {
      title: '基金代码',
      dataIndex: 'fund_code',
      key: 'fund_code',
      width: 120,
    },
    {
      title: '基金名称',
      dataIndex: 'fund_name',
      key: 'fund_name',
      render: (text: string) => (
        <div className={styles['fund-name-cell']}>
          <FundOutlined className={styles['fund-icon']} />
          <span className={styles['fund-name']}>{text}</span>
        </div>
      ),
    },
    {
      title: '添加时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 180,
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveFavorite(record.id)}
          className={styles['remove-button']}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <div className={styles['favorite-funds-container']}>
      <Card className={styles['favorite-funds-card']} title="自选基金" loading={loading}>
        {error && <div className={styles['error-message']}>获取自选基金失败：{error}</div>}
        {list.length > 0 ? (
          <Table
            columns={columns}
            dataSource={list}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className={styles['favorite-funds-table']}
          />
        ) : (
          <div className={styles['empty-content']}>
            <p>暂无自选基金</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FavoriteFunds;