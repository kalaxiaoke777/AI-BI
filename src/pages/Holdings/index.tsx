import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Row,
  Col,
  Statistic,
  Button,
  Modal,
  InputNumber,
  message,
} from "antd";
import {
  FundOutlined,
  WalletOutlined,
  SwapOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  fetchHoldingsRequest,
  fetchTotalProfitRequest,
  redeemFundRequest,
} from "../../redux/actions/holdingsActions";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const Holdings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    list: holdingsList,
    totalProfit,
    loading,
    error,
  } = useAppSelector((state) => state.holdings);

  // 赎回相关状态
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<any>(null);
  const [redeemShares, setRedeemShares] = useState<number>(0);
  const [isRedeeming, setIsRedeeming] = useState(false);

  useEffect(() => {
    dispatch(fetchHoldingsRequest());
    dispatch(fetchTotalProfitRequest());
  }, [dispatch]);

  // 收益颜色样式
  const getProfitColor = (value: number) => {
    return value >= 0 ? "#ff4d4f" : "#52c41a";
  };

  // 跳转到基金详情页
  const handleFundClick = (fundCode: string) => {
    navigate(`/funds/${fundCode}`);
  };

  // 打开赎回模态框
  const handleRedeemClick = (holding: any) => {
    setSelectedHolding(holding);
    setRedeemShares(0);
    setRedeemModalVisible(true);
  };

  // 处理赎回份额变化
  const handleSharesChange = (value: number | null) => {
    if (value !== null) {
      setRedeemShares(value);
    }
  };

  // 确认赎回
  const handleRedeemConfirm = () => {
    if (!selectedHolding) return;

    if (redeemShares <= 0) {
      message.error("赎回份额必须大于0");
      return;
    }

    if (redeemShares > selectedHolding.shares) {
      message.error("赎回份额不能超过持有份额");
      return;
    }

    setIsRedeeming(true);

    dispatch(
      redeemFundRequest({
        holding_id: selectedHolding.id,
        shares: redeemShares,
      })
    )
      .then(() => {
        message.success("赎回申请提交成功");
        setRedeemModalVisible(false);
        // 刷新持有基金列表
        dispatch(fetchHoldingsRequest());
        dispatch(fetchTotalProfitRequest());
      })
      .catch((err) => {
        message.error(`赎回失败: ${err.message || "操作失败"}`);
      })
      .finally(() => {
        setIsRedeeming(false);
      });
  };

  // 持有基金表格列配置
  const holdingsColumns = [
    {
      title: "基金代码",
      dataIndex: "fund_code",
      key: "fund_code",
      width: 120,
    },
    {
      title: "基金名称",
      dataIndex: "fund_name",
      key: "fund_name",
      render: (text: string, record: any) => (
        <div
          className={styles["fund-name-cell"]}
          onClick={() => handleFundClick(record.fund_code)}
          style={{ cursor: "pointer" }}
        >
          <FundOutlined className={styles["fund-icon"]} />
          <span className={styles["fund-name"]}>{text}</span>
        </div>
      ),
    },
    {
      title: "持有份额",
      dataIndex: "shares",
      key: "shares",
      width: 120,
      render: (value: number) => value.toFixed(4),
    },
    {
      title: "当前净值",
      dataIndex: "current_price",
      key: "current_price",
      width: 120,
      render: (value: number) => value.toFixed(4),
    },
    {
      title: "持仓成本",
      dataIndex: "total_cost",
      key: "total_cost",
      width: 120,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: "日收益率",
      dataIndex: "holding_profit_rate",
      key: "holding_profit_rate",
      width: 120,
      render: (value: number) => (
        <span style={{ color: getProfitColor(value) }}>
          {value >= 0 ? "+" : ""}
          {value.toFixed(2)}%
        </span>
      ),
    },
    {
      title: "日收益",
      dataIndex: "daily_profit",
      key: "daily_profit",
      width: 120,
      render: (value: number) => (
        <span style={{ color: getProfitColor(value) }}>
          {value >= 0 ? "+" : ""}
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      title: "持仓收益",
      dataIndex: "holding_profit",
      key: "holding_profit",
      width: 120,
      render: (value: number) => (
        <span style={{ color: getProfitColor(value) }}>
          {value >= 0 ? "+" : ""}
          {value.toFixed(2)}
        </span>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 100,
      render: (text: string, record: any) => (
        <Button
          type="primary"
          danger
          icon={<SwapOutlined />}
          onClick={() => handleRedeemClick(record)}
          size="small"
        >
          赎回
        </Button>
      ),
    },
  ];

  return (
    <div className={styles["holdings-container"]}>
      {/* 总收益概览 */}
      {totalProfit && (
        <Card
          className={styles["profit-overview-card"]}
          title="收益概览"
          loading={loading}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="总持仓市值"
                value={totalProfit.total_holding_value}
                precision={2}
                prefix={<WalletOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="总投入成本"
                value={totalProfit.total_cost}
                precision={2}
                prefix={<WalletOutlined />}
                valueStyle={{ color: "#666666" }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="总持仓收益"
                value={totalProfit.total_holding_profit}
                precision={2}
                prefix={totalProfit.total_holding_profit >= 0 ? "+" : ""}
                valueStyle={{
                  color: getProfitColor(totalProfit.total_holding_profit),
                }}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="总收益率"
                value={totalProfit.total_holding_profit_rate}
                precision={2}
                suffix="%"
                prefix={totalProfit.total_holding_profit_rate >= 0 ? "+" : ""}
                valueStyle={{
                  color: getProfitColor(totalProfit.total_holding_profit_rate),
                }}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* 持有基金列表 */}
      <Card
        className={styles["holdings-card"]}
        title="持有基金"
        loading={loading}
      >
        <Table
          columns={holdingsColumns}
          dataSource={holdingsList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className={styles["holdings-table"]}
        />
      </Card>

      {/* 赎回模态框 */}
      <Modal
        title={
          <div className={styles["modal-title"]}>
            <SwapOutlined /> 赎回基金
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setRedeemModalVisible(false)}
              className={styles["modal-close-btn"]}
            />
          </div>
        }
        open={redeemModalVisible}
        onCancel={() => setRedeemModalVisible(false)}
        footer={null}
        width={500}
        className={styles["redeem-modal"]}
      >
        {selectedHolding && (
          <div className={styles["redeem-modal-content"]}>
            <div className={styles["fund-info"]}>
              <div className={styles["fund-name"]}>
                {selectedHolding.fund_name}
              </div>
              <div className={styles["fund-code"]}>
                {selectedHolding.fund_code}
              </div>
            </div>

            <div className={styles["holdings-info"]}>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>当前持有份额：</span>
                <span className={styles["value"]}>
                  {selectedHolding.shares.toFixed(4)}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>当前净值：</span>
                <span className={styles["value"]}>
                  {selectedHolding.current_price.toFixed(4)}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>持仓成本：</span>
                <span className={styles["value"]}>
                  ¥{selectedHolding.total_cost.toFixed(2)}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["label"]}>当前市值：</span>
                <span className={styles["value"]}>
                  ¥
                  {(
                    selectedHolding.shares * selectedHolding.current_price
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <div className={styles["redeem-input-section"]}>
              <div className={styles["input-label"]}>赎回份额</div>
              <div className={styles["input-wrapper"]}>
                <InputNumber
                  min={0.0001}
                  max={selectedHolding.shares}
                  step={0.0001}
                  value={redeemShares}
                  onChange={handleSharesChange}
                  placeholder="请输入赎回份额"
                  className={styles["shares-input"]}
                  style={{ width: "100%" }}
                />
              </div>
              <div className={styles["input-hint"]}>
                可赎回份额：{selectedHolding.shares.toFixed(4)}
              </div>
            </div>

            <div className={styles["redeem-amount-section"]}>
              <div className={styles["amount-label"]}>预计赎回金额</div>
              <div className={styles["amount-value"]}>
                ¥{(redeemShares * selectedHolding.current_price).toFixed(2)}
              </div>
            </div>

            <div className={styles["modal-actions"]}>
              <Button
                onClick={() => setRedeemModalVisible(false)}
                className={styles["cancel-btn"]}
              >
                取消
              </Button>
              <Button
                type="primary"
                danger
                onClick={handleRedeemConfirm}
                loading={isRedeeming}
                className={styles["confirm-btn"]}
              >
                确认赎回
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Holdings;
