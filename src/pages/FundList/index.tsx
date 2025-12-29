import React, { useEffect, useRef, useState } from 'react';
import { Table, Input, Select, Button, Space, Typography, Card, Row, Col } from 'antd';
import { SearchOutlined, FundOutlined, LineChartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchFundsRequest } from '../../redux/actions/fundActions';
import type { FundBasic, FundFilters } from '../../types/fund';
import './index.scss';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const FundList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);
  const { list, loading, pagination, filters } = useAppSelector((state) => state.funds);
  
  const [searchParams, setSearchParams] = useState<FundFilters>({
    page: 1,
    page_size: 10,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchFundsRequest(searchParams));
    }
  }, []);

  // 搜索基金
  const handleSearch = (values: any) => {
    const params: FundFilters = {
      ...searchParams,
      ...values,
      page: 1,
    };
    setSearchParams(params);
    dispatch(fetchFundsRequest(params));
  };

  // 分页变化
  const handlePageChange = (page: number, pageSize: number) => {
    const params = {
      ...searchParams,
      page,
      page_size: pageSize,
    };
    setSearchParams(params);
    dispatch(fetchFundsRequest(params));
  };

  // 排序变化
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // 只有在有排序字段时才更新
    if (sorter.field) {
      const params = {
        ...searchParams,
        sort_by: sorter.field,
        sort_order: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
      setSearchParams(params);
      dispatch(fetchFundsRequest(params));
    }
  };

  // 基金类型映射
  const fundTypeMap: Record<number, string> = {
    1: '混合型',
    2: '股票型',
    3: '债券型',
    4: '货币型',
    5: 'QDII',
  };

  // 表格列配置
  const columns = [
    {
      title: '基金代码',
      dataIndex: 'fund_code',
      key: 'fund_code',
      width: 120,
      sorter: true,
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: '基金名称',
      dataIndex: 'fund_name',
      key: 'fund_name',
      sorter: true,
      render: (text: string, record: FundBasic) => (
        <Link to={`/funds/${record.id}`} className="fund-name-link">
          <FundOutlined className="fund-icon" /> {text}
        </Link>
      ),
    },
    {
      title: '基金类型',
      dataIndex: 'fund_type',
      key: 'fund_type',
      width: 100,
      sorter: true,
      render: (type: number) => fundTypeMap[type] || '未知',
      filters: [
        { text: '混合型', value: 1 },
        { text: '股票型', value: 2 },
        { text: '债券型', value: 3 },
        { text: '货币型', value: 4 },
        { text: 'QDII', value: 5 },
      ],
      onFilter: (value: any, record: FundBasic) => record.fund_type === value,
    },
    {
      title: '基金公司',
      dataIndex: 'company_name',
      key: 'company_name',
      sorter: true,
    },
    {
      title: '基金经理',
      dataIndex: 'manager',
      key: 'manager',
      width: 120,
      sorter: true,
    },
    {
      title: '最新净值',
      dataIndex: 'latest_nav',
      key: 'latest_nav',
      width: 100,
      sorter: true,
      render: (nav: number) => nav != null ? nav.toFixed(4) : '-',
    },
    {
      title: '最新净值日期',
      dataIndex: 'latest_nav_date',
      key: 'latest_nav_date',
      width: 120,
      sorter: true,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '日增长率',
      dataIndex: 'daily_growth',
      key: 'daily_growth',
      width: 100,
      sorter: true,
      render: (growth: number) => (
        <span className={growth > 0 ? 'growth-positive' : growth < 0 ? 'growth-negative' : ''}>
          {growth != null ? `${growth > 0 ? '+' : ''}${growth.toFixed(2)}%` : '-'}
        </span>
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'risk_level',
      key: 'risk_level',
      width: 100,
      sorter: true,
      render: (level: number) => {
        const stars = [];
        for (let i = 0; i < Math.floor(level); i++) {
          stars.push(<span key={i} style={{ color: '#fadb14', marginRight: '2px' }}>★</span>);
        }
        return stars;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: FundBasic) => (
        <Space size="middle">
          <Button type="link" icon={<LineChartOutlined />} onClick={() => navigate(`/funds/${record.id}`)}>
            详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="fund-list-container">
      <Title level={2} className="page-title">基金列表</Title>
      
      {/* 搜索筛选卡片 */}
      <Card className="search-card" title="筛选条件" size="small">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space orientation="vertical" size="small" style={{ width: '100%' }}>
              <span>基金代码</span>
              <Input placeholder="请输入基金代码" onChange={(e) => handleSearch({ fund_code: e.target.value })} />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space orientation="vertical" size="small" style={{ width: '100%' }}>
              <span>基金名称</span>
              <Input placeholder="请输入基金名称" onChange={(e) => handleSearch({ fund_name: e.target.value })} />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space orientation="vertical" size="small" style={{ width: '100%' }}>
              <span>基金类型</span>
              <Select placeholder="请选择基金类型" onChange={(value) => handleSearch({ fund_type: value })} style={{ width: '100%' }}>
                <Option value={1}>混合型</Option>
                <Option value={2}>股票型</Option>
                <Option value={3}>债券型</Option>
                <Option value={4}>货币型</Option>
                <Option value={5}>QDII</Option>
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space orientation="vertical" size="small" style={{ width: '100%' }}>
              <span>可购买</span>
              <Select placeholder="是否可购买" onChange={(value) => handleSearch({ is_purchaseable: value })} style={{ width: '100%' }}>
                <Option value={true}>是</Option>
                <Option value={false}>否</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 基金列表表格 */}
      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.page_size,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: handlePageChange,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
        onChange={handleTableChange}
        scroll={{ x: 1200 }}
        className="fund-table"
      />
    </div>
  );
};

export default FundList;
