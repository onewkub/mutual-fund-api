import { IFundOntolgy } from '../../interface/ontology'
import { getFundOntology, Risk } from '../Fund'

function selectRisk(loss: number) {
  /**
   * Low Risk = Loss < 10
   * Medium Risk = Loss < 15
   * High Risk = Loss >= 15
   */
  const risk_category = {
    safe_risk: {
      equity_fund: 30,
      fixed_income_fund: 70,
      other_fund: 0,
    },
    low_risk: {
      equity_fund: 40,
      fixed_income_fund: 60,
      other_fund: 0,
    },
    medium_risk: {
      equity_fund: 50,
      fixed_income_fund: 50,
      other_fund: 0,
    },
    high_risk: {
      equity_fund: 50,
      fixed_income_fund: 40,
      other_fund: 10,
    },
  }
  if (loss <= 5) return risk_category.low_risk
  else if (loss <= 10) return risk_category.low_risk
  else if (loss <= 15) return risk_category.medium_risk
  else if (loss > 15) return risk_category.high_risk
  return risk_category.low_risk
}

export async function getOptimalFund(
  loss: number,
  profit: number,
  dividend: boolean,
) {
  const ratio = selectRisk(loss)
  // let rest_loss = loss
  // get the lowest risk drawdown
  const fix_income_fund = getFundOntology(loss, profit, dividend, 1, Risk.low)

  // console.log(fix_income_fund)
  const equity_fund = getFundOntology(loss, profit, dividend, 1, Risk.medium)

  const other_fund = getFundOntology(loss, profit, dividend, 1, Risk.high)

  const res = await Promise.all([fix_income_fund, equity_fund, other_fund])

  const rlt = {
    fix_income_fund: { ...res[0][0], percentage: ratio.fixed_income_fund },
    equity_fund: { ...res[1][0], percentage: ratio.equity_fund },
    other_fund: { ...res[2][0], percentage: ratio.other_fund },
  }
  // console.log(rlt)
  return rlt
}

async function test() {
  const mock_user = {
    loss: 30,
    profit: 10,
    dividend: false,
  }
  await getOptimalFund(mock_user.loss, mock_user.profit, mock_user.dividend)
}

test()
