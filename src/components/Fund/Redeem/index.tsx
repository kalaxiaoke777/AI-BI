import React from "react";
import { Modal, InputNumber, Button, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

interface RedeemModalProps {
  visible: boolean;
  holding: any;
  onCancel: () => void;
  onConfirm: (shares: number) => void;
  isRedeeming: boolean;
}

const RedeemModal: React.FC<RedeemModalProps> = ({
  visible,
  holding,
  onCancel,
  onConfirm,
  isRedeeming,
}) => {
  const [redeemShares, setRedeemShares] = React.useState<number>(0);

  // 收益颜色样式
  const getProfitColor = (value: number) => {
    return value >= 0 ? "#52c41a" : "#ff4d4f";
  };

  // 处理赎回份额变化
  const handleSharesChange = (value: number | null) => {
    if (value !== null) {
      setRedeemShares(value);
    }
  };

  // 确认赎回
  const handleRedeemConfirm = () => {
    if (!holding) return;
    
    if (redeemShares <= 0) {
      message.error("赎回份额必须大于0");
      return;
    }
    
    if (redeemShares > holding.shares) {
      message.error("赎回份额不能超过持有份额");
      return;
    }
    
    onConfirm(redeemShares);
  };

  return (
    <Modal
      title={<div className={styles["modal-title"]}><SwapOutlined /> 赎回基金</div>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
      className={styles["redeem-modal"]}
    >
      {holding && (
        <div className={styles["redeem-modal-content"]}>
          <div className={styles["fund-info"]}>
            <div className={styles["fund-name"]}>{holding.fund_name}</div>
            <div className={styles["fund-code"]}>{holding.fund_code}</div>
          </div>
          
          <div className={styles["holdings-info"]}>
            <div className={styles["info-item"]}>
              <span className={styles["label"]}>当前持有份额：</span>
              <span className={styles["value"]}>{holding.shares.toFixed(4)}</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["label"]}>当前净值：</span>
              <span className={styles["value"]}>{holding.current_price.toFixed(4)}</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["label"]}>持仓成本：</span>
              <span className={styles["value"]}>¥{holding.total_cost.toFixed(2)}</span>
            </div>
            <div className={styles["info-item"]}>
              <span className={styles["label"]}>当前市值：</span>
              <span className={styles["value"]}>¥{(holding.shares * holding.current_price).toFixed(2)}</span>
            </div>
          </div>
          
          <div className={styles["redeem-input-section"]}>
            <div className={styles["input-label"]}>赎回份额</div>
            <div className={styles["input-wrapper"]}>
              <InputNumber
                min={0.0001}
                max={holding.shares}
                step={0.0001}
                value={redeemShares}
                onChange={handleSharesChange}
                placeholder="请输入赎回份额"
                className={styles["shares-input"]}
                style={{ width: '100%' }}
              />
            </div>
            <div className={styles["input-hint"]}>可赎回份额：{holding.shares.toFixed(4)}</div>
          </div>
          
          <div className={styles["redeem-amount-section"]}>
            <div className={styles["amount-label"]}>预计赎回金额</div>
            <div className={styles["amount-value"]}>
              ¥{(redeemShares * holding.current_price).toFixed(2)}
            </div>
          </div>
          
          <div className={styles["modal-actions"]}>
            <Button
              onClick={onCancel}
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
  );
};

export default RedeemModal;