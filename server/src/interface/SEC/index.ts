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
