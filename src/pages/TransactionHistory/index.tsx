import React, { useEffect } from "react";
import { Card, Table } from "antd";
import { FundOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchTransactionsRequest } from "../../redux/actions/holdingsActions";
import styles from "./index.module.scss";

const TransactionHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useAppSelector((state) => state.holdings);

  useEffect(() => {
    dispatch(fetchTransactionsRequest());
  }, [dispatch]);

  // 交易记录表格列配置
  const transactionsColumns = [
    {
      title: "基金名称",
      dataIndex: "fund_name",
      key: "fund_name",
      render: (text: string) => (
        <div className={styles["fund-name-cell"]}>
          <FundOutlined className={styles["fund-icon"]} />
          <span className={styles["fund-name"]}>{text}</span>
        </div>
      ),
    },
    {
      title: "交易类型",
      dataIndex: "transaction_type",
      key: "transaction_type",
      width: 100,
      render: (type: string) => (
        <span
          className={
            type === "purchase"
              ? styles["purchase-type"]
              : styles["redeem-type"]
          }
        >
          {type === "purchase" ? "买入" : "卖出"}
        </span>
      ),
    },
    {
      title: "交易份额",
      dataIndex: "shares",
      key: "shares",
      width: 120,
      render: (value: number) => value.toFixed(4),
    },
    {
      title: "交易价格",
      dataIndex: "transaction_price",
      key: "transaction_price",
      width: 120,
      render: (value: number) => `¥${value.toFixed(4)}`,
    },
    {
      title: "交易金额",
      dataIndex: "transaction_amount",
      key: "transaction_amount",
      width: 120,
      render: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      title: "交易时间",
      dataIndex: "transaction_time",
      key: "transaction_time",
      width: 180,
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <span
          className={
            status === "completed"
              ? styles["completed-status"]
              : styles["pending-status"]
          }
        >
          {status === "completed" ? "已完成" : "处理中"}
        </span>
      ),
    },
  ];

  return (
    <div className={styles["transaction-history-container"]}>
      <Card
        className={styles["transaction-history-card"]}
        title="交易记录"
        loading={loading}
      >
        <Table
          columns={transactionsColumns}
          dataSource={transactions}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className={styles["transactions-table"]}
        />
      </Card>
    </div>
  );
};
export default TransactionHistory;
