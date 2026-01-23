import React, { useEffect, useState } from "react";
import { Card, Table, Row, Col, Statistic, Button } from "antd";
import { FundOutlined, WalletOutlined, SwapOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  fetchHoldingsRequest,
  fetchTotalProfitRequest,
  redeemFundRequest,
} from "../../redux/actions/holdingsActions";
import { useNavigate } from "react-router-dom";
import RedeemModal from "../../components/Fund/Redeem";
import SynchronizedPositionModal from "../../components/Fund/SynchronizedPosition";
import styles from "./index.module.scss";

const Holdings: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    list: holdingsList,
    totalProfit,
    loading,
  } = useAppSelector((state) => state.holdings);
  // 赎回相关状态
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState<any>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [
    synchronizedPositionModalVisible,
    setSynchronizedPositionModalVisible,
  ] = useState(false);
  const [isSynchronized, setIsSynchronized] = useState(false);
  // 批量选择状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
    setRedeemModalVisible(true);
  };
  // 打开同步持仓模态框
  const handleSynchronizedPositionClick = () => {
    setSynchronizedPositionModalVisible(true);
  };
  // 确认赎回
  const handleRedeemConfirm = async (shares: number) => {
    if (!selectedHolding) return;
    setIsRedeeming(true);
    await dispatch(
      redeemFundRequest({
        holding_id: selectedHolding.id,
        shares: shares,
      }),
    );
    // 刷新持有基金列表
    dispatch(fetchHoldingsRequest());
    dispatch(fetchTotalProfitRequest());
    setIsRedeeming(false);
    setRedeemModalVisible(false);
  };
  // 确认同步持仓
  const handleSynchronizedPositionConfirm = async () => {
    setIsSynchronized(true);
    try {
      // 刷新持有基金列表
      dispatch(fetchHoldingsRequest());
      dispatch(fetchTotalProfitRequest());
      setSynchronizedPositionModalVisible(false);
    } catch (error) {
      console.error("同步持仓失败:", error);
    } finally {
      setIsSynchronized(false);
    }
  };
  // 持有基金表格列配置
  const holdingsColumns = [
    // 添加选择列
    {
      title: (
        <div className={styles["table-header"]}>
          <span>选择</span>
          {selectedRowKeys.length > 0 && (
            <Button
              className={styles["delete-selected-button"]}
              type="primary"
              danger
              onClick={() => handleDeleteSelected()}
              size="small"
              style={{ marginLeft: 10 }}
            >
              删除所选 {selectedRowKeys.length} 项
            </Button>
          )}
        </div>
      ),
      key: "selection",
      type: "selection",
      width: 80,
    },
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
      title: "今日估值涨幅",
      dataIndex: "today_profit_rate",
      key: "today_profit_rate",
      width: 120,
      render: (value: number) => (value ? value.toFixed(4) : "0.0000"),
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
      width: 180,
      render: (_: string, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            className={styles["add-button"]}
            type="primary"
            icon={<FundOutlined />}
            onClick={() => handleFundClick(record.fund_code)}
            size="small"
          >
            详情
          </Button>
          <Button
            className={styles["redeem-button"]}
            type="primary"
            danger
            icon={<SwapOutlined />}
            onClick={() => handleRedeemClick(record)}
            size="small"
          >
            赎回
          </Button>
        </div>
      ),
    },
  ];

  // 处理选择变化
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 批量删除所选基金
  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;

    // 这里可以添加删除确认弹窗
    console.log("删除所选基金:", selectedRowKeys);
    // 实际删除逻辑需要调用API
    // 清空选择
    setSelectedRowKeys([]);
    // 刷新列表
    dispatch(fetchHoldingsRequest());
  };

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
      <div className={styles["action-buttons"]}>
        <Button
          className={styles["action-button"]}
          type="primary"
          onClick={handleSynchronizedPositionClick}
        >
          同步持仓
        </Button>
      </div>

      {/* 持有基金列表 */}
      <Card
        className={styles["holdings-card"]}
        title={
          <div className={styles["card-title-container"]}>
            <span>持有基金</span>
            <Button
              className={styles["batch-delete-button"]}
              type="primary"
              danger
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0}
            >
              批量删除 ({selectedRowKeys.length})
            </Button>
          </div>
        }
        loading={loading}
      >
        <Table
          columns={holdingsColumns}
          dataSource={holdingsList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className={styles["holdings-table"]}
          // 添加选择功能
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectChange,
          }}
        />
      </Card>

      {/* 赎回模态框 - 使用组件 */}
      <RedeemModal
        visible={redeemModalVisible}
        holding={selectedHolding}
        onCancel={() => setRedeemModalVisible(false)}
        onConfirm={handleRedeemConfirm}
        isRedeeming={isRedeeming}
      />
      {/* 同步持仓模态框 - 使用组件 */}
      <SynchronizedPositionModal
        visible={synchronizedPositionModalVisible}
        onCancel={() => setSynchronizedPositionModalVisible(false)}
        onConfirm={() => handleSynchronizedPositionConfirm()}
        isLoading={isSynchronized}
      />
    </div>
  );
};

export default Holdings;
