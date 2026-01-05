import React, { useEffect, useRef, useState } from 'react';
import { Card, Typography, Row, Col, Statistic, Descriptions, Button, Space } from 'antd';
import { ArrowLeftOutlined, FundOutlined, LineChartOutlined, StarOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchFundDetailRequest, fetchFundGrowthRequest } from '../../redux/actions/fundActions';
import * as echarts from 'echarts';
import styles from './index.module.scss';

const { Title, Text } = Typography;

const FundDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { fundId } = useParams<{ fundId: string }>();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<echarts.ECharts | null>(null);
  
  const { detail, growth, loading } = useAppSelector((state) => state.funds);

  // 基金类型映射
  const fundTypeMap: Record<number, string> = {
    1: '混合型',
    2: '股票型',
    3: '债券型',
    4: '货币型',
    5: 'QDII',
  };

  useEffect(() => {
    if (fundId) {
      dispatch(fetchFundDetailRequest(Number(fundId)));
      dispatch(fetchFundGrowthRequest(Number(fundId)));
    }
  }, [fundId]);

  useEffect(() => {
    if (chartRef.current && !chart) {
      const newChart = echarts.init(chartRef.current);
      setChart(newChart);
      
      window.addEventListener('resize', () => newChart.resize());
      
      return () => {
        newChart.dispose();
        window.removeEventListener('resize', () => newChart.resize());
      };
    }
  }, [chart]);

  // 更新图表数据
  useEffect(() => {
    if (chart && growth && growth.length > 0) {
      // 准备图表数据
      const dates = growth.map(item => item.trade_date);
      const navData = growth.map(item => item.nav);
      const accumNavData = growth.map(item => item.accum_nav);
      const growthData = growth.map(item => item.daily_growth);

      // 设置图表配置
      const option = {
        title: {
          text: '基金历史净值走势',
          left: 'center',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            let result = `${params[0].axisValue}<br/>`;
            params.forEach((item: any) => {
              result += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
            });
            return result;
          }
        },
        legend: {
          data: ['单位净值', '累计净值', '日增长率'],
          top: 30
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates
        },
        yAxis: [
          {
            type: 'value',
            name: '净值',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '日增长率(%)',
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [
          {
            name: '单位净值',
            type: 'line',
            data: navData,
            smooth: true,
            yAxisIndex: 0
          },
          {
            name: '累计净值',
            type: 'line',
            data: accumNavData,
            smooth: true,
            yAxisIndex: 0
          },
          {
            name: '日增长率',
            type: 'line',
            data: growthData,
            smooth: true,
            yAxisIndex: 1,
            itemStyle: {
              color: '#52c41a'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(82, 196, 26, 0.3)'
                }, {
                  offset: 1, color: 'rgba(82, 196, 26, 0)'
                }]
              }
            }
          }
        ]
      };

      chart.setOption(option);
    }
  }, [chart, growth]);

  // 返回基金列表
  const handleBack = () => {
    navigate('/funds');
  };

  // 添加到自选基金
  const handleAddToFavorites = () => {
    // 这里将实现添加到自选基金的功能
    console.log('添加到自选基金');
  };

  // 购买基金
  const handlePurchase = () => {
    // 这里将实现购买基金的功能
    console.log('购买基金');
  };

  if (loading || !detail) {
    return <div className={styles['loading-container']}>加载中...</div>;
  }

  return (
    <div className={styles['fund-detail-container']}>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />} 
        onClick={handleBack}
        className={styles['back-button']}
      >
        返回基金列表
      </Button>
      
      <Title level={2} className={styles['page-title']}>
        <FundOutlined className={styles['title-icon']} />
        {detail.fund_name}
      </Title>
      
      {/* 基金基本信息卡片 */}
      <Card className={styles['basic-info-card']} title="基本信息" size="small" loading={loading}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Statistic 
              title="基金代码" 
              value={detail.fund_code} 
              valueStyle={{ fontSize: 20, fontWeight: 'bold' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic 
              title="基金类型" 
              value={fundTypeMap[detail.fund_type] || '未知'}
              valueStyle={{ fontSize: 20 }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic 
              title="最新净值" 
              value={detail.latest_nav} 
              precision={4}
              valueStyle={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic 
              title="成立日期" 
              value={new Date(detail.launch_date).toLocaleDateString()}
              valueStyle={{ fontSize: 20 }}
            />
          </Col>
        </Row>
        
        <Descriptions column={2} bordered style={{ marginTop: 20 }}>
          <Descriptions.Item label="基金简称">{detail.short_name}</Descriptions.Item>
          <Descriptions.Item label="基金经理">{detail.manager}</Descriptions.Item>
          <Descriptions.Item label="基金公司">{detail.company_name}</Descriptions.Item>
          <Descriptions.Item label="风险等级">
            {Array.from({ length: Math.floor(detail.risk_level) }).map((_, i) => (
              <span key={i} style={{ color: '#fadb14', marginRight: '2px', fontSize: '18px' }}>★</span>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="申购起点" span={2}>{detail.purchase_min_amount} 元</Descriptions.Item>
          <Descriptions.Item label="赎回起点" span={2}>{detail.redemption_min_amount} 元</Descriptions.Item>
          <Descriptions.Item label="是否可申购" span={2}>
            {detail.is_purchaseable ? (
              <Text type="success">是</Text>
            ) : (
              <Text type="danger">否</Text>
            )}
          </Descriptions.Item>
        </Descriptions>
        
        {/* 操作按钮 */}
        <Space size="middle" style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
          <Button 
            type="primary" 
            icon={<StarOutlined />} 
            onClick={handleAddToFavorites}
            size="large"
          >
            添加到自选
          </Button>
          <Button 
            type="primary" 
            icon={<WalletOutlined />} 
            onClick={handlePurchase}
            size="large"
            disabled={!detail.is_purchaseable}
          >
            立即购买
          </Button>
        </Space>
      </Card>
      
      {/* 历史净值走势图表 */}
      <Card className={styles['chart-card']} title="历史净值走势" size="small" loading={loading}>
        <div ref={chartRef} className={styles['growth-chart']} />
      </Card>
      
      {/* 基金经理信息 */}
      <Card className={styles['manager-card']} title="基金经理信息" size="small" loading={loading}>
        <Row gutter={16} align="middle">
          <Col xs={6} sm={4}>
            <div className={styles['manager-avatar']}>
              <FundOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </div>
          </Col>
          <Col xs={18} sm={20}>
            <div>
              <h3 style={{ marginBottom: 8 }}>{detail.manager}</h3>
              <p style={{ margin: 0, color: '#666' }}>基金经理简介：</p>
              <p style={{ margin: '8px 0', color: '#999' }}>暂无详细信息</p>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FundDetail;