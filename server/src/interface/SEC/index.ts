export interface IAMC_SEC {
  unique_id: string
  name_th: string
  name_en: string
  last_upd_date: Date
}

export interface IProj {
  last_upd_date: string
  proj_id: string
  regis_id: string
  regis_date: Date
  cancel_date: Date
  proj_name_th: string
  proj_name_en: string
  proj_abbr_name: string
  fund_status: string
  unique_id: string
  premit_us_investment: string
  invest_country_flag: string
}

export interface IRisk {
  last_upd_date: string
  fund_suitable_desc: string
  fund_not_suitable_desc: string
  important_notice: string
  risk_spectrum: string
}

export interface IPerformance {
  last_upd_date: string
  class_abbr_name: string
  performance_type_desc: string
  reference_period: string
  performance_val: string
  as_of_date: string
}

export interface ILost {
  last_upd_date: string
  class_abbr_name: string
  loss_five_year_percent: string
  sd_five_year_percent: string
  tracking_error_percent: string
}

export interface IDividend {
  last_upd_date: string
  class_abbr_name: string
  dividend_policy: string
  dividend_policy_remark: string
  dividend_details: IDividendDetail[]
}

export interface IDividendDetail {
  book_closing_date: string
  payment_date: string
  dividend_per_share: string
}

export interface IClassFund {
  proj_id: string
  last_upd_date: string
  proj_abbr_name: string
  class_abbr_name: string
  class_name: string
  class_additional_desc: string
}

export interface IPolicy {
  last_upd_date: string
  policy_desc: string
  investment_policy_desc: string
  management_style: string
}

export interface IAsset {
  proj_id: string
  assetseq: string
  secur_name: string
  secur_abbr_name: string
  period: string
  secur_Invest_size: string
}

export interface IPerformance {
  last_upd_date: string
  class_abbr_name: string
  performance_type_desc: string
  reference_period: string
  performance_val: string
  as_of_date: string
}

export interface INAVFund {
  last_upd_date: string
  nav_date: string
  net_asset: number
  last_val: number
  previous_val: number
  amc_info: {
    unique_id: string
    sell_price: number
    buy_price: number
    sell_swap_price: number
    buy_swap_price: number
    remark_th: string
    remark_en: string
  }[]
}
