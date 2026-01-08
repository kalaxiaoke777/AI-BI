import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Descriptions,
  Button,
  Space,
  message,
  Modal,
  InputNumber,
} from "antd";
import {
  ArrowLeftOutlined,
  FundOutlined,
  StarOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchFundDetailRequest } from "../../redux/actions/fundActions";
import { addFavoriteFundRequest } from "../../redux/actions/favoriteFundsActions";
import { purchaseFundRequest } from "../../redux/actions/holdingsActions";
import * as echarts from "echarts";
import type { FundCombinedParams } from "../../types/fund";
import styles from "./index.module.scss";

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
    1: "混合型",
    2: "股票型",
    3: "债券型",
    4: "货币型",
    5: "QDII",
  };

  useEffect(() => {
    if (fundId) {
      const params: FundCombinedParams = {
        fund_id: String(fundId),
        page: 1,
      };
      dispatch(fetchFundDetailRequest(params));
      // dispatch(fetchFundGrowthRequest(Number(fundId)));
    }
  }, [fundId]);

  useEffect(() => {
    if (chartRef.current && !chart) {
      const newChart = echarts.init(chartRef.current);
      setChart(newChart);

      window.addEventListener("resize", () => newChart.resize());

      return () => {
        newChart.dispose();
        window.removeEventListener("resize", () => newChart.resize());
      };
    }
  }, [chart]);

  // 更新图表数据
  useEffect(() => {
    if (chart && growth && growth.length > 0) {
      // 准备图表数据
      const dates = growth.map((item) => item.trade_date);
      const navData = growth.map((item) => item.nav);
      const accumNavData = growth.map((item) => item.accum_nav);
      const growthData = growth.map((item) => item.daily_growth);

      // 设置图表配置
      const option = {
        title: {
          text: "基金历史净值走势",
          left: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params: any) => {
            let result = `${params[0].axisValue}<br/>`;
            params.forEach((item: any) => {
              result += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
            });
            return result;
          },
        },
        legend: {
          data: ["单位净值", "累计净值", "日增长率"],
          top: 30,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
        },
        yAxis: [
          {
            type: "value",
            name: "净值",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "日增长率(%)",
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: "单位净值",
            type: "line",
            data: navData,
            smooth: true,
            yAxisIndex: 0,
          },
          {
            name: "累计净值",
            type: "line",
            data: accumNavData,
            smooth: true,
            yAxisIndex: 0,
          },
          {
            name: "日增长率",
            type: "line",
            data: growthData,
            smooth: true,
            yAxisIndex: 1,
            itemStyle: {
              color: "#52c41a",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(82, 196, 26, 0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(82, 196, 26, 0)",
                  },
                ],
              },
            },
          },
        ],
      };

      chart.setOption(option);
    }
  }, [chart, growth]);

  // 返回基金列表
  const handleBack = () => {
    navigate("/funds");
  };

  // 添加到自选基金
  const handleAddToFavorites = () => {
    if (detail && detail.data[0].fund.id) {
      dispatch(addFavoriteFundRequest({ fund_id: detail.data[0].fund.id }));
      message.success("已添加到自选基金");
    } else {
      message.error("添加自选基金失败：缺少基金ID");
    }
  };

  // 购买基金相关状态
  const [isPurchaseModalVisible, setIsPurchaseModalVisible] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);

  // 显示购买模态框
  const showPurchaseModal = () => {
    setIsPurchaseModalVisible(true);
  };

  // 隐藏购买模态框
  const handlePurchaseModalCancel = () => {
    setIsPurchaseModalVisible(false);
    setPurchaseAmount(1);
  };

  // 确认购买
  const handlePurchaseConfirm = () => {
    if (detail && detail.data[0].fund.fund_code && purchaseAmount > 0) {
      dispatch(
        purchaseFundRequest({
          fund_code: detail.data[0].fund.fund_code,
          amount: purchaseAmount,
        })
      );
      message.success("购买成功");
      setIsPurchaseModalVisible(false);
      setPurchaseAmount(1);
    } else {
      message.error("购买失败：请输入有效的购买金额");
    }
  };

  // 购买基金
  const handlePurchase = () => {
    showPurchaseModal();
  };

  // InputNumber onChange处理函数
  const handleAmountChange = (value: number | null) => {
    if (value !== null) {
      setPurchaseAmount(value);
    }
  };

  if (loading || !detail) {
    return <div className={styles["loading-container"]}>加载中...</div>;
  }

  return (
    <div className={styles["fund-detail-container"]}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        className={styles["back-button"]}
      >
        返回基金列表
      </Button>

      <Title level={2} className={styles["page-title"]}>
        <FundOutlined className={styles["title-icon"]} />
        {detail.data[0].fund.fund_name}
      </Title>

      {/* 基金基本信息卡片 */}
      <Card
        className={styles["basic-info-card"]}
        title="基本信息"
        size="small"
        loading={loading}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="基金代码"
              value={detail.data[0].fund.fund_code}
              valueStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="基金类型"
              value={fundTypeMap[detail.data[0].fund.fund_type] || "未知"}
              valueStyle={{ fontSize: 20 }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="最新净值"
              value={detail.data[0].fund.latest_nav}
              precision={4}
              valueStyle={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#1890ff",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="成立日期"
              value={new Date(
                detail.data[0].fund.launch_date
              ).toLocaleDateString()}
              valueStyle={{ fontSize: 20 }}
            />
          </Col>
        </Row>

        <Descriptions column={2} bordered style={{ marginTop: 20 }}>
          <Descriptions.Item label="基金简称">
            {detail.data[0].fund.short_name}
          </Descriptions.Item>
          <Descriptions.Item label="基金经理">
            {detail.data[0].fund.manager}
          </Descriptions.Item>
          <Descriptions.Item label="基金公司">
            {detail.data[0].fund.company_name}
          </Descriptions.Item>
          <Descriptions.Item label="风险等级">
            {Array.from({
              length: Math.floor(detail.data[0].fund.risk_level),
            }).map((_, i) => (
              <span
                key={i}
                style={{
                  color: "#fadb14",
                  marginRight: "2px",
                  fontSize: "18px",
                }}
              >
                ★
              </span>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="申购起点" span={2}>
            {detail.data[0].fund.purchase_min_amount} 元
          </Descriptions.Item>
          <Descriptions.Item label="赎回起点" span={2}>
            {detail.data[0].fund.redemption_min_amount} 元
          </Descriptions.Item>
          <Descriptions.Item label="是否可申购" span={2}>
            {detail.data[0].fund.is_purchaseable ? (
              <Text type="success">是</Text>
            ) : (
              <Text type="danger">否</Text>
            )}
          </Descriptions.Item>
        </Descriptions>

        {/* 操作按钮 */}
        <Space
          size="middle"
          style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
        >
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
            disabled={!detail.data[0].fund.is_purchaseable}
          >
            立即购买
          </Button>
        </Space>
      </Card>

      {/* 基金排名信息卡片 */}
      <Card
        className={styles["ranking-card"]}
        title="基金排名与收益"
        size="small"
        loading={loading}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="日增长率"
              value={detail.data[0].rank.daily_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.daily_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.daily_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="周增长率"
              value={detail.data[0].rank.weekly_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.weekly_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.weekly_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="月增长率"
              value={detail.data[0].rank.monthly_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.monthly_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.monthly_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="年增长率"
              value={detail.data[0].rank.yearly_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.yearly_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.yearly_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="季度增长率"
              value={detail.data[0].rank.quarterly_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.quarterly_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.quarterly_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="两年增长率"
              value={detail.data[0].rank.two_year_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.two_year_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.two_year_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="三年增长率"
              value={detail.data[0].rank.three_year_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.three_year_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.three_year_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="五年增长率"
              value={detail.data[0].rank.five_year_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.five_year_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.five_year_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Statistic
              title="成立以来"
              value={detail.data[0].rank.since_launch_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.since_launch_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.since_launch_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={6}>
            <Statistic
              title="今年涨幅"
              value={detail.data[0].rank.ytd_growth}
              precision={2}
              suffix="%"
              valueStyle={{
                fontSize: 28,
                fontWeight: "bold",
                color:
                  detail.data[0].rank.ytd_growth > 0
                    ? "#ff4d4f"
                    : detail.data[0].rank.ytd_growth < 0
                    ? "#52c41a"
                    : "#666",
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* 历史净值走势图表 */}
      {/* <Card className={styles['chart-card']} title="历史净值走势" size="small" loading={loading}>
        <div ref={chartRef} className={styles['growth-chart']} />
      </Card> */}

      {/* 基金公司信息 */}
      <Card
        className={styles["company-card"]}
        title="基金公司信息"
        size="small"
        loading={loading}
      >
        <Descriptions column={2} bordered>
          <Descriptions.Item label="公司名称">
            {detail.data[0].company?.company_name ||
              detail.data[0].company?.company_name}
          </Descriptions.Item>
          <Descriptions.Item label="公司简称">
            {detail.data[0].company?.short_name || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="成立日期">
            {detail.data[0].company?.establish_date
              ? new Date(
                  detail.data[0]?.company?.establish_date
                ).toLocaleDateString()
              : "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {/* 购买基金模态框 */}
      <Modal
        title="购买基金"
        open={isPurchaseModalVisible}
        onOk={handlePurchaseConfirm}
        onCancel={handlePurchaseModalCancel}
        okText="确认购买"
        cancelText="取消"
      >
        <div className={styles["purchase-modal-content"]}>
          <h3>基金名称：{detail.data[0].fund.fund_name}</h3>
          <h4>基金代码：{detail.data[0].fund.fund_code}</h4>
          <h4>最新净值：{detail.data[0].fund.latest_nav}</h4>
          <div className={styles["purchase-amount-section"]}>
            <label className={styles["amount-label"]}>购买金额（元）：</label>
            <InputNumber
              min={1}
              max={100000}
              step={1}
              value={purchaseAmount}
              onChange={handleAmountChange}
              className={styles["amount-input"]}
            />
          </div>
          <div className={styles["purchase-info"]}>
            <p>
              预计购买份额：
              {(purchaseAmount / detail.data[0].fund.latest_nav).toFixed(4)} 份
            </p>
            <p>申购起点：{detail.data[0].fund.purchase_min_amount} 元</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FundDetail;
