import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Button, message, Input, Select, Form, Card } from "antd";
import { SyncOutlined, SearchOutlined, DollarOutlined, BarChartOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import fundService from "../../../services/fund";

const { Option } = Select;
const { Item } = Form;

interface SynchronizedPositionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (data: any) => void;
  isLoading: boolean;
}

const SynchronizedPositionModal: React.FC<SynchronizedPositionModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const [fundNames, setFundNames] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // 搜索基金名称
  const handleSearch = async (value: string) => {
    if (!value || value.length < 1) {
      setFundNames([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fundService.getFundList({
        fund_name: value,
        page: 1,
        page_size: 10,
      });
      console.log(res);
      
      
      if (res.data && res.data.length > 0) {
        setFundNames(res.data);
      } else {
        setFundNames([]);
        message.info("未找到匹配的基金");
      }
    } catch (error) {
      message.error("搜索基金失败");
      setFundNames([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 处理基金选择
  const handleFundSelect = (fundId: string, fundName: string) => {
    form.setFieldsValue({ fundId, fundName });
    setFundNames([]);
    setSearchValue(fundName);
  };

  // 处理同步持仓确认
  const handleSynchronizedPositionConfirm = async () => {
    try {
      const values = await form.validateFields();
      // onConfirm(values);
    } catch (error) {
      console.log(error);
      
      message.error("请完善同步信息");
    }
  };

  // 重置表单
  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setFundNames([]);
      setSearchValue("");
    }
  }, [visible, form]);

  return (
    <Modal
      title={
        <div className={styles["modal-title"]}>
          <SyncOutlined /> 同步持仓
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      className={styles["synchronized-modal"]}
    >
      <Card className={styles["synchronized-card"]}>
        <Form
          form={form}
          layout="vertical"
          className={styles["synchronized-form"]}
        >
          <Item
            name="fundName"
            label="基金名称"
            rules={[{ required: true, message: "请输入基金名称" }]}
          >
            <div className={styles["fund-search-container"]}>
              <Input
                placeholder="请输入基金名称"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => {
                  if (searchValue) {
                    handleSearch(searchValue);
                  }
                }}
                prefix={<SearchOutlined />}
                className={styles["fund-search-input"]}
              />
              {fundNames.length > 0 && (
                <div className={styles["search-results"]}>
                  {fundNames.map((item: any) => (
                    <div
                      key={item.fund_id}
                      className={styles["search-result-item"]}
                      onClick={() => handleFundSelect(item.fund_id, item.fund_name)}
                    >
                      <div className={styles["result-fund-name"]}>{item.fund_name}</div>
                      <div className={styles["result-fund-code"]}>{item.fund_code}</div>
                    </div>
                  ))}
                </div>
              )}
              {isSearching && (
                <div className={styles["search-loading"]}>搜索中...</div>
              )}
            </div>
          </Item>

          <Item
            name="holdingAmount"
            label="持有金额"
            rules={[{ required: true, message: "请输入持有金额" }, { type: 'number', message: "请输入数字" }]}
          >
            <InputNumber
              placeholder="请输入持有金额"
              min={0}
              step={10}
              precision={2}
              prefix={<DollarOutlined />}
              className={styles["amount-input"]}
              style={{ width: "100%" }}
            />
          </Item>

          <Item
            name="holdingProfit"
            label="持有收益"
            rules={[{ required: true, message: "请输入持有收益" }, { type: 'number', message: "请输入数字" }]}
          >
            <InputNumber
              placeholder="请输入持有收益"
              min={-999999999}
              step={0.01}
              precision={2}
              prefix={<BarChartOutlined />}
              className={styles["profit-input"]}
              style={{ width: "100%" }}
            />
          </Item>
        </Form>

        <div className={styles["modal-actions"]}>
          <Button
            onClick={onCancel}
            className={styles["cancel-btn"]}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={handleSynchronizedPositionConfirm}
            loading={isLoading}
            className={styles["confirm-btn"]}
          >
            确认同步
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default SynchronizedPositionModal;
