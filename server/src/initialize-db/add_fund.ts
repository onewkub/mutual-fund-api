import { IFund } from '../interface/IFund'
import { httpRequest_SEC } from '../lib/httpRequest'
import prisma from '../lib/prisma'

interface IProj {
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

function MapToIFundModel(data: IProj[], amc_id: string): IFund[] {
  const res: IFund[] = data
    .filter(
      (element) => element.fund_status === 'SE' || element.fund_status === 'RG',
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

async function AddFund(amc_id: string) {
  try {
    const res = await httpRequest_SEC.get<IProj[]>(
      `https://api.sec.or.th/FundFactsheet/fund/amc/${amc_id}`,
    )
    const data = MapToIFundModel(res.data, amc_id)
    const count = await prisma.fund.createMany({ data })
    console.log(count)
  } catch (e) {
    console.log(e)
  }
}

AddFund('C0000000239')
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
