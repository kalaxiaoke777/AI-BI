import api from "../api";

// 持有基金API服务
export const holdingsService = {
  // 获取持有基金列表
  getHoldings: () => api.get("/ss-fund/holdings"),

  // 购买基金
  purchaseFund: (fundCode: string, amount: number) =>
    api.post("/ss-fund/holdings/purchase", { fund_code: fundCode, amount }),

  // 赎回基金
  redeemFund: (holdingId: number, shares: number) =>
    api.post("/ss-fund/holdings/redeem", { holding_id: holdingId, shares }),

  // 获取交易记录
  getTransactions: (params?: any) =>
    api.get("/ss-fund/transactions", { params }),

  // 获取总收益
  getTotalProfit: () => api.get("/ss-fund/total-profit"),

  // 获取待处理交易
  getPendingTransactions: () => api.get("/ss-fund/pending-transactions"),
  // 取消交易
  cancelTransaction: (transactionId: number) =>
    api.post(`/ss-fund/pending-transactions/${transactionId}/cancel`),
};

export default holdingsService;
