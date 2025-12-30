import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as echarts from 'echarts';
import './index.scss';
import { Card, Spin, Typography } from 'antd';
import api from '../../services/api';

const { Title, Text } = Typography;

// 定义指数类型
interface IndexType {
  value: string;
  label: string;
}

// 定义指数数据类型
interface IndexDataItem {
  date: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

// 定义指数列表项类型
interface IndexListItem {
  id: number;
  index_name: string;
  index_code: string;
  secid: string;
  market: string;
  description: string;
  created_at: string;
  updated_at: string;
}



const IndexAnalysis: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  
  // 指数类型选项
  const [indexTypes, setIndexTypes] = useState<IndexType[]>([]);
  // 当前选中的指数
  const [selectedIndex, setSelectedIndex] = useState('沪深300');
  // 数据加载状态
  const [loading, setLoading] = useState(false);
  // 指数数据
  const [indexData, setIndexData] = useState<IndexDataItem[]>([]);

  // 初始化图表
  const initChart = useCallback(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
  }, []);

  // 获取指数列表
  const fetchIndexList = useCallback(async () => {
    try {
      // api.get已经返回了response.data，使用类型断言
      const data = await api.get('/index/list') as unknown as IndexListItem[];
      const types = data.map((item: IndexListItem) => ({
        value: item.index_name,
        label: item.index_name
      }));
      setIndexTypes(types);
    } catch (error) {
      console.error('获取指数列表失败:', error);
      // 使用默认指数列表作为备选
      setIndexTypes([
        { value: '沪深300', label: '沪深300' },
        { value: '中证500', label: '中证500' },
        { value: '中证1000', label: '中证1000' },
        { value: '创业板指', label: '创业板指' },
        { value: '科创50', label: '科创50' }
      ]);
    }
  }, []);

  // 渲染图表
  const renderChart = useCallback((data: IndexDataItem[]) => {
    if (!chartInstance.current || data.length === 0) return;

    // 处理数据，提取日期和收盘价
    const dates = data.map(item => item.date);
    const prices = data.map(item => item.close);

    const option = {
      title: {
        text: selectedIndex,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params: unknown) {
          const data = params as Array<{ name: string; value: number }>;
          return `
            <div>
              <p>日期: ${data[0].name}</p>
              <p>收盘价: ${data[0].value.toFixed(2)}</p>
            </div>
          `;
        }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        scale: true
      },
      series: [
        {
          data: prices,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#3498db'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(52, 152, 219, 0.3)' },
              { offset: 1, color: 'rgba(52, 152, 219, 0.05)' }
            ])
          }
        }
      ]
    };

    chartInstance.current.setOption(option);
  }, [selectedIndex]);

  // 获取指数数据
  const fetchIndexData = useCallback(async () => {
    setLoading(true);
    try {
      // 使用项目配置的API实例获取数据，api.get已经返回了response.data，使用类型断言
      const data = await api.get('/index/history', {
        params: {
          index_name: selectedIndex
        }
      }) as unknown as IndexDataItem[];
      
      if (data && data.length > 0) {
        // 数据格式已经符合要求，直接使用
        setIndexData(data);
        renderChart(data);
      } else {
        console.error('获取的数据格式不符合要求或为空');
      }
    } catch (error) {
      console.error('获取指数数据失败:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedIndex, renderChart]);

  // 监听窗口大小变化，自适应图表
  const handleResize = useCallback(() => {
    chartInstance.current?.resize();
  }, []);

  // 组件挂载时初始化
  useEffect(() => {
    initChart();
    fetchIndexList();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [initChart, fetchIndexList, handleResize]);

  // 当指数列表加载完成后，获取初始指数数据
  useEffect(() => {
    if (indexTypes.length > 0) {
      fetchIndexData();
    }
  }, [indexTypes, fetchIndexData]);

  // 当选中的指数变化时，重新获取数据
  useEffect(() => {
    fetchIndexData();
  }, [selectedIndex, fetchIndexData]);

  return (
    <div className="index-analysis-container">
      {/* 左侧指数列表 */}
      <div className="index-list">
        <div className="index-list-header">
          <h2>指数列表</h2>
        </div>
        <div className="index-list-body">
          {indexTypes.map(type => (
            <div
              key={type.value}
              className={`index-item ${selectedIndex === type.value ? 'active' : ''}`}
              onClick={() => setSelectedIndex(type.value)}
            >
              <div className="index-name">{type.label}</div>
              <div className="index-desc">
                {type.value === '沪深300' && '反映沪深市场整体走势'}
                {type.value === '中证500' && '反映中小市值公司表现'}
                {type.value === '中证1000' && '反映小盘股市场表现'}
                {type.value === '创业板指' && '反映创业板市场走势'}
                {type.value === '科创50' && '反映科创板核心企业表现'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="index-content">
        <div className="index-content-header">
          <Title level={2}>{selectedIndex} 指数分析</Title>
        </div>
        
        <div className="index-content-body">
          <Card className="chart-card">
            <Spin spinning={loading} tip="加载数据中...">
              <div 
                ref={chartRef} 
                className="index-chart"
              />
            </Spin>
          </Card>
          
          {!loading && indexData.length > 0 && (
            <Card className="data-card">
              <Title level={4}>最新数据</Title>
              <div className="data-grid">
                <div className="data-item">
                  <Text strong>最新价:</Text>
                  <Text className="data-value">{indexData[indexData.length - 1].close.toFixed(2)}</Text>
                </div>
                <div className="data-item">
                  <Text strong>最高价:</Text>
                  <Text className="data-value">{Math.max(...indexData.map(item => item.high)).toFixed(2)}</Text>
                </div>
                <div className="data-item">
                  <Text strong>最低价:</Text>
                  <Text className="data-value">{Math.min(...indexData.map(item => item.low)).toFixed(2)}</Text>
                </div>
                <div className="data-item">
                  <Text strong>成交量:</Text>
                  <Text className="data-value">{indexData[indexData.length - 1].volume.toLocaleString()}</Text>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexAnalysis;