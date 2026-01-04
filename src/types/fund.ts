// 基金基本信息类型
export interface FundBasic {
  id: number;
  fund_code: string;
  short_name: string;
  fund_name: string;
  fund_type: number;
  pinyin: string;
  manager: string;
  company_id: number;
  company_name: string;
  launch_date: string;
  latest_nav: number;
  latest_nav_date: string;
  is_purchaseable: boolean;
  purchase_min_amount: number;
  redemption_min_amount: number;
  risk_level: number;
  daily_growth: number;
  created_at: string;
  updated_at: string;
}

// 基金历史涨幅数据类型
export interface FundGrowth {
  id: number;
  fund_id: number;
  trade_date: string;
  nav: number;
  accum_nav: number;
  daily_growth: number;
}

// 基金公司信息类型
export interface FundCompany {
  id: number;
  company_name: string;
  short_name: string;
  established_date: string;
  registered_capital: number;
  headquarters: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// 基金排行数据类型
export interface FundRank {
  fund_id: number;
  fund_code: string;
  fund_name: string;
  fund_type: number;
  nav: number;
  daily_growth: number;
  weekly_growth: number;
  monthly_growth: number;
  quarterly_growth: number;
  yearly_growth: number;
  rank: number;
}

// 基金组合查询结果类型
export interface CombinedFund {
  id: number;
  fund_code: string;
  short_name: string;
  fund_name: string;
  fund_type: number;
  manager: string;
  company_id: number;
  company_name: string;
  latest_nav: number;
  latest_nav_date: string;
  daily_growth: number;
  weekly_growth: number;
  monthly_growth: number;
  rank: number;
}

// 基金列表筛选参数类型
export interface FundFilters {
  page?: number;
  page_size?: number;
  fund_code?: string;
  fund_name?: string;
  fund_type?: number;
  company_id?: number;
  company_name?: string;
  is_purchaseable?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// 基金状态类型
export interface FundsState {
  list: FundBasic[];
  detail: FundBasic | null;
  growth: FundGrowth[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  filters: FundFilters;
}

// 基金公司状态类型
export interface CompaniesState {
  list: FundCompany[];
  detail: FundCompany | null;
  funds: FundBasic[];
  loading: boolean;
  error: string | null;
}

// 基金查询状态类型
export interface QueriesState {
  combined: CombinedFund[];
  rank: FundRank[];
  growth: FundGrowth[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}
