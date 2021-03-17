export function getRiskAtInteger(risk: string): number {
  switch (risk) {
    case 'RS1':
      return 1
    case 'RS2':
      return 2
    case 'RS3':
      return 3
    case 'RS4':
      return 4
    case 'RS5':
      return 5
    case 'RS6':
      return 6
    case 'RS7':
      return 7
    case 'RS8':
      return 8
    case 'RS81':
      return 81
    default:
      return 0
  }
}

export function mapFundPolicy(policy: string) {
  switch (policy) {
    case 'ตราสารทุน':
      return 'equity_fund'
    case 'ตราสารแห่งทุน':
      return 'equity_fund'
    case 'ตราสารหนี้':
      return 'fixed_income_fund'
    case 'ผสม':
      return 'mixed_fund'
    case 'ทรัพย์สินทางเลือก':
      return 'alternative_investment_fund'
    default:
      return 'other'
  }
}
