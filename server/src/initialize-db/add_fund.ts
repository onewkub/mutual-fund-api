import { IFund } from '../interface/Fund'
import {
  IClassFund,
  IDividend,
  ILost,
  IPolicy,
  IProj,
  IRisk,
} from '../interface/SEC'
import prisma from '../lib/prisma'
import { httpRequest_SEC } from '../lib/sec_api'
import { getRiskAtInteger, mapFundPolicy } from './helper'

function mapToIFundModel(data: IProj[], amc_id: string): IFund[] {
  const res: IFund[] = data
    .filter((element) => element.fund_status === 'RG')
    .map((element) => ({
      projid: element.proj_id,
      symbol: element.proj_abbr_name,
      name_th: element.proj_name_th,
      name_en: element.proj_name_en,
      amc_id: amc_id,
    }))
  return res
}

async function addFund(amc_id: string) {
  try {
    console.log(`Fetching ${amc_id} Fund data from SEC....`)

    const res = await httpRequest_SEC.get<IProj[]>(
      `/FundFactsheet/fund/amc/${amc_id}`,
    )

    console.log('Fetching Fund data success')

    const data = mapToIFundModel(res.data, amc_id)

    addFundToOntology(data)
    // console.log('Insert Fund data to Local Database....')

    // await prisma.fund.createMany({ data })

    // console.log('Insert Fund data success')
  } catch (e) {
    console.log(e)
  }
}

async function addFundToOntology(fund_data: IFund[]) {
  fund_data.map((element) => element.projid)

  const res = await Promise.all(
    fund_data.map((element) => getProjectClassInfo(element)),
  )
  const data = res
  console.log(data)
}
/**
 * to do
 * /FundFactsheet/fund/{proj_id}/class_fund
 * /FundFactsheet/fund/{proj_id}/policy
 * /FundFactsheet/fund/{proj_id}/5YearLost
 * /FundFactsheet/fund/{proj_id}/performance
 * /FundFactsheet/fund/{proj_id}/dividend
 */

async function getProjectClassInfo(projectInfo: IFund) {
  const fund_class = getClassFund(projectInfo)
  const fund_policy = getFundPolicy(projectInfo.projid)
  const fund_loss = getLoss(projectInfo.projid)
  const fund_risk = getFundRisk(projectInfo.projid)
  const res = await Promise.all([fund_class, fund_policy, fund_loss, fund_risk])
  return {
    project_id: projectInfo.projid,
    all_class: res[0],
    fund_policy: res[1],
    fund_loss: res[2],
    fund_risk: res[3],
  }
}

async function getLoss(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<ILost[] | ILost>(
      `/FundFactsheet/fund/${project_id}/5YearLost`,
    )
    let avg: number = 0
    if (Array.isArray(res.data)) {
      const sum = res.data.reduce(
        (prev, curr) => prev + Number(curr.loss_five_year_percent),
        0,
      )
      avg = sum / res.data.length
    } else {
      return res.data.loss_five_year_percent
    }
    // console.log(avg)
    return avg
  } catch (error) {
    console.log(error)
  }
}

async function getFundPolicy(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IPolicy>(
      `/FundFactsheet/fund/${project_id}/policy`,
    )
    return mapFundPolicy(res.data.policy_desc)
  } catch (error) {
    console.log(error)
  }
}

async function getClassFund(projectInfo: IFund) {
  try {
    const res = await httpRequest_SEC.get<IClassFund[]>(
      `/FundFactsheet/fund/${projectInfo.projid}/class_fund`,
    )
    if (res.data.length >= 2) {
      return res.data.map((element) => ({
        project_id: element.proj_id,
        project_name: element.class_abbr_name,
        project_class_name: element.class_name,
      }))
    } else {
      return [
        {
          project_id: projectInfo.projid,
          project_name: projectInfo.symbol,
          project_class_name: '-',
        },
      ]
    }
  } catch (err) {
    console.log(err)
  }
}

// async function getDividend(project_id: string) {
//   try {
//     const res = await httpRequest_SEC.get<IDividend>(
//       `/FundFactsheet/fund/${project_id}/dividend`,
//     )
//     if (res.data) console.log(res.data)
//     return {
//       project_id,
//       dividend: res.data.dividend_policy,
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

async function getFundRisk(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IRisk>(
      `/FundFactsheet/fund/${project_id}/suitability`,
    )
    return getRiskAtInteger(res.data.risk_spectrum)
  } catch (err) {
    console.log(err)
  }
}

addFund('C0000000239')
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
