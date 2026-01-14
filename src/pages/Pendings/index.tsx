import React, { useEffect, useState } from "react";
import { Card, Table, Button, message } from "antd";
import { DeleteOutlined, FundOutlined, RedoOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { holdingsService } from "../../services/holdings/";
import styles from "./index.module.scss";

const Pendings: React.FC = () => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    holdingsService
      .getPendingTransactions()
      .then((res: any) => {
        setLoading(false);
        console.log(res);

        setList(res || []);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || "获取待处理交易失败");
      });
  }, [dispatch]);

  // 处理删除自选基金
  const handleRemoveFavorite = (id: number) => {
    message.success("已从自选基金中删除");
  };

  // 表格列配置
  const columns = [
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
      width: 200,
    },
    {
      title: "操作金额",
      dataIndex: "amount",
      key: "amount",
      width: 120,
    },
    {
      title: "操作时间",
      dataIndex: "submit_time",
      key: "submit_time",
      width: 200,
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "操作状态",
      dataIndex: "status",
      key: "status",
      width: 120,
    },
    {
      title: "操作备注",
      dataIndex: "note",
      key: "note",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<RedoOutlined />}
          onClick={() => handleRemoveFavorite(record.id)}
          className={styles["remove-button"]}
        >
          撤销
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Card
        title="等待操作"
        loading={loading}
      >
        {error && <div>获取等待操作失败：{error}</div>}
        {list.length > 0 ? (
          <Table
            columns={columns}
            dataSource={list}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        ) : (
          <div>
            <p>暂无等待操作</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Pendings;