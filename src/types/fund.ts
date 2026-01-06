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
  establish_date: string;
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
  three_year_growth: number;
  two_year_growth: number;
  weekly_growth: number;
  monthly_growth: number;
  quarterly_growth: number;
  yearly_growth: number;
  five_year_growth: number;
  rank: number;
  ytd_growth: number;
  since_launch_growth: number;
}

// 基金组合查询结果类型
export interface CombinedFund {
  fund: FundBasic;
  rank: FundRank;
  company: FundCompany;
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
  detail: FundDetailResponse | null;
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

export interface FundCombinedParams {
  fund_id?: string;
  page?: number;
  page_size?: number;
  company_name?: string;
  min_yearly_growth?: number;
  min_monthly_growth?: number;
  max_risk_level?: number;
  is_purchaseable?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FundDetailResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  data: CombinedFund[];
}