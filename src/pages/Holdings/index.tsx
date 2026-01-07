import React, { useEffect } from 'react';
import { Card, Table, Row, Col, Statistic } from 'antd';
import { FundOutlined, WalletOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { 
  fetchHoldingsRequest, 
  fetchTotalProfitRequest
} from '../../redux/actions/holdingsActions';
import styles from './index.module.scss';

const Holdings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: holdingsList, totalProfit, loading } = useAppSelector((state) => state.holdings);

  useEffect(() => {
    dispatch(fetchHoldingsRequest());
    dispatch(fetchTotalProfitRequest());
  }, [dispatch]);

  // 收益颜色样式
  const getProfitColor = (value: number) => {
    return value >= 0 ? '#52c41a' : '#ff4d4f';
  };

  // 持有基金表格列配置
  const holdingsColumns = [
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
      title: '持有份额',
      dataIndex: 'shares',
      key: 'shares',
      width: 120,
      render: (value: number) => value.toFixed(4),
    },
    {
      title: '当前净值',
      dataIndex: 'current_price',
      key: 'current_price',
      width: 120,
      render: (value: number) => value.toFixed(4),
    },
    {
      title: '持仓成本',
      dataIndex: 'total_cost',
      key: 'total_cost',
      width: 120,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: '当前市值',
      dataIndex: 'current_value',
      key: 'current_value',
      width: 120,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: '日收益',
      dataIndex: 'daily_profit',
      key: 'daily_profit',
      width: 120,
      render: (value: number) => (
        <span style={{ color: getProfitColor(value) }}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}%
        </span>
      ),
    },
    {
      title: '持仓收益',
      dataIndex: 'holding_profit',
      key: 'holding_profit',
      width: 120,
      render: (value: number) => (
        <span style={{ color: getProfitColor(value) }}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}%
        </span>
      ),
    },
  ];

  return (
    <div className={styles['holdings-container']}>
      {/* 总收益概览 */}
      {totalProfit && (
        <Card className={styles['profit-overview-card']} title="收益概览" loading={loading}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="总持仓市值" 
                value={totalProfit.total_holding_value} 
                precision={2}
                prefix={<WalletOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="总投入成本" 
                value={totalProfit.total_cost} 
                precision={2}
                prefix={<WalletOutlined />}
                valueStyle={{ color: '#666666' }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="总持仓收益" 
                value={totalProfit.total_holding_profit} 
                precision={2}
                prefix={totalProfit.total_holding_profit >= 0 ? '+' : '-'}
                valueStyle={{ color: getProfitColor(totalProfit.total_holding_profit) }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic 
                title="总收益率" 
                value={totalProfit.total_holding_profit_rate} 
                precision={2}
                suffix="%"
                prefix={totalProfit.total_holding_profit_rate >= 0 ? '+' : '-'}
                valueStyle={{ color: getProfitColor(totalProfit.total_holding_profit_rate) }}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* 持有基金列表 */}
      <Card className={styles['holdings-card']} title="持有基金" loading={loading}>
        <Table
          columns={holdingsColumns}
          dataSource={holdingsList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className={styles['holdings-table']}
        />
      </Card>
    </div>
  );
};

export default Holdings;