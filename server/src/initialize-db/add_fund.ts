import { IFund } from '../interface/Fund'
import {
  IClassFund,
  IDividend,
  // IDividend,
  ILost,
  IPerformance,
  IPolicy,
  IProj,
  IRisk,
} from '../interface/SEC'
import { addFundOntology, IFundInsert } from '../lib/ontology_api'
import prisma from '../lib/prisma'
import { httpRequest_SEC } from '../lib/sec_api'
import { addTop5Asset } from './add_asset'
import { getRiskAtInteger, mapFundPolicy } from './helper'

function mapToIFundModel(data: IProj[], amc_id: string): IFund[] {
  const res: IFund[] = data
    .filter(
      (element) =>
        element.fund_status === 'RG' &&
        new Date(element.regis_date) > new Date('2010-12-31'),
    )
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

    console.log('Insert Fund data to Local Database....')

    await prisma.fund.createMany({ data, skipDuplicates: true })

    console.log('Insert Fund data to Knowledgebase....')

    await addFundToOntology(data)

    await prisma.$disconnect()
    console.log(`END for ${amc_id}`)
    // return new Promise(() => {
    //   setTimeout(() => console.log(`END for ${amc_id}`), 5000)
    // })
  } catch (err) {
    console.log(err)
  }
}

async function addFundToOntology(fund_data: IFund[]) {
  const project_ids = fund_data.map((element) => element.projid)

  const res: any[] = await Promise.all(
    fund_data.map((element) => getProjectClassInfo(element)),
  )

  // const data = [].concat(...res)
  const data = res
  console.log('insert Fund to Ontology...')
  await Promise.all(
    data.map((element) => {
      addFundOntology(element)
    }),
  )

  console.log('fetching asset from all fund...')
  await Promise.all(project_ids.map((element) => addTop5Asset(element)))

  console.log('add top 5 asset and invest to Ontology complete')
  console.log('insert Fund to Ontology complete')
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
  // const fund_class = getClassFund(projectInfo)
  const fund_policy = getFundPolicy(projectInfo.projid)
  const fund_loss = getLoss(projectInfo.projid)
  const fund_risk = getFundRisk(projectInfo.projid)
  const fund_dividend = getFundDividend(projectInfo.projid)
  const fund_perfomance = getPerformance(projectInfo.projid)
  const res = await Promise.all([
    // fund_class,
    fund_policy,
    fund_loss,
    fund_risk,
    fund_dividend,
    fund_perfomance,
  ])

  const res_1: IFundInsert = {
    project_id: projectInfo.projid,
    project_name: projectInfo.symbol,
    // all_class: res[0],
    project_policy: res[0],
    project_loss: res[1],
    project_risk: res[2],
    project_dividend: res[3],
    project_profit: res[4]?.avg_profit,
    project_sd: res[4]?.avg_sd,
  }
  // Seperate to sub class

  // const res_2 = res_1.all_class?.map((element) => ({
  //   ...element,
  //   project_loss: res_1.fund_loss,
  //   project_risk: res_1.fund_risk,
  //   project_policy: res_1.fund_policy,
  //   project_dividend: res_1.fund_dividend,
  // }))
  // console.log(res_2)
  return res_1
}

async function getLoss(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<ILost[] | ILost>(
      `/FundFactsheet/fund/${project_id}/5YearLost`,
    )
    if (Array.isArray(res.data)) {
      const sum = res.data.reduce(
        (prev, curr) => prev + Number(curr.loss_five_year_percent),
        0,
      )
      const avg: number = Number((sum / res.data.length).toFixed(2))
    } else {
      return Number(res.data.loss_five_year_percent)
    }
    // console.log(avg)
    return undefined
  } catch (err) {
    console.log(err)
  }
}

async function getFundPolicy(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IPolicy>(
      `/FundFactsheet/fund/${project_id}/policy`,
    )
    return mapFundPolicy(res.data.policy_desc)
  } catch (err) {
    console.log(err)
  }
}

// async function getClassFund(projectInfo: IFund) {
//   try {
//     const res = await httpRequest_SEC.get<IClassFund[]>(
//       `/FundFactsheet/fund/${projectInfo.projid}/class_fund`,
//     )
//     if (res.data.length >= 2) {
//       return res.data.map((element) => ({
//         project_id: element.proj_id,
//         project_name: element.class_abbr_name,
//         project_class_name: element.class_name,
//       }))
//     } else {
//       return [
//         {
//           project_id: projectInfo.projid,
//           project_name: projectInfo.symbol,
//           project_class_name: '-',
//         },
//       ]
//     }
//   } catch (err) {
//     console.log(err)
//   }
// }

async function getFundDividend(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IDividend[]>(
      `/FundFactsheet/fund/${project_id}/dividend`,
    )
    if (Array.isArray(res.data)) {
      const rlt = res.data.some((element) => element.dividend_policy === 'Y')
      return rlt
    }
    return false
    // return res.data.dividend_policy === 'Y' ? true : false
  } catch (err) {
    console.log(err)
  }
}

async function getFundRisk(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IRisk>(
      `/FundFactsheet/fund/${project_id}/suitability`,
    )
    return getRiskAtInteger(res.data.risk_spectrum)
  } catch (err) {
    console.error(err)
  }
}

async function getPerformance(project_id: string) {
  try {
    const res = await httpRequest_SEC.get<IPerformance[]>(
      `/FundFactsheet/fund/${project_id}/performance`,
    )
    if (Array.isArray(res.data) && res.data.length !== 0) {
      const sd_data = res.data.filter(
        (element) =>
          element.performance_type_desc === 'ความผันผวนของกองทุนรวม' &&
          element.reference_period === 'ตั้งแต่จัดตั้ง',
      )
      const profit_data = res.data.filter(
        (element) =>
          element.performance_type_desc === 'ผลตอบแทนกองทุนรวม' &&
          element.reference_period === 'ตั้งแต่จัดตั้ง',
      )
      // console.log(profit_data)
      const avg_sd: number = Number(
        (
          sd_data.reduce(
            (prev, curr) => prev + Number(curr.performance_val),
            0,
          ) / profit_data.length
        ).toFixed(2),
      )

      const avg_profit: number = Number(
        (
          profit_data.reduce(
            (prev, curr) => prev + Number(curr.performance_val),
            0,
          ) / profit_data.length
        ).toFixed(2),
      )
      // console.log(avg_profit)
      return { avg_profit, avg_sd }
    } else {
      return undefined
    }
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  const cooldown = 300
  await addFund('C0000000239') //SCB
  console.log(`waiting for ${cooldown} sec`)
  await clockTime(cooldown)
  await addFund('C0000000329') //BBL
  console.log(`waiting for ${cooldown} sec`)
  await clockTime(cooldown)
  await addFund('C0000000182') //TMB
  console.log(`waiting for ${cooldown} sec`)
  await clockTime(cooldown)
  await addFund('C0000000021') //KASSET
}

async function clockTime(n: number) {
  let second = n
  const _timer = setInterval(() => {
    second--
    console.log(`Time remaining: ${second} s`)
  }, 1000)
  const timer = await new Promise((resolve) =>
    setTimeout(() => {
      clearInterval(_timer)
      return resolve(null)
    }, 1000 * n),
  )
  return timer
}

async function test() {
  const res = await getPerformance('M0429_2556')
  console.log(res)
}

// test()
main()
