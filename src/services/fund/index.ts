import api from "../api";

// 基金基础API服务
export const fundService = {
  // 获取基金列表
  getFundList: (params?: any) => api.get("/query/fund/basic", { params }),

  // 获取基金详情
  getFundDetail: (params?: any) =>
    api.get(`/query/fund/combined`, { params }),

  // 获取基金历史净值
  getFundNetValueHistory: (fundCode: string, params?: any) =>
    api.get(`/fund/${fundCode}/net-value-history`, { params }),

  // 获取基金持仓
  getFundHoldings: (fundCode: string) =>
    api.get(`/query/fund/${fundCode}/holdings`),

  // 获取基金经理
  getFundManager: (fundCode: string) =>
    api.get(`/query/fund/${fundCode}/manager`),

  // 获取基金历史涨幅
  getFundGrowth: (fundCode: string) =>
    api.get(`/query/fund/${fundCode}/growth`),

  // 获取基金公司列表
  getFundCompanies: () => api.get("/query/fund/company"),

  // 获取基金公司详情
  getFundCompanyDetail: (companyId: string) =>
    api.get(`/query/fund/company/${companyId}`),

  // 获取基金公司发行的基金列表
  getCompanyFunds: (companyId: string) =>
    api.get(`/fund/companies/${companyId}/fund`),
};

export default fundService;
