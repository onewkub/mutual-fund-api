import { IAMC } from '../interface/IAMC'
import { httpRequest_SEC } from '../lib/httpRequest'
import prisma from '../lib/prisma'

interface IAMC_old {
  unique_id: string
  name_th: string
  name_en: string
  last_upd_date: Date
}

function MapToAMCModel(data: IAMC_old[]): IAMC[] {
  const res: IAMC[] = data.map((element) => ({
    id: element.unique_id,
    name_th: element.name_th,
    name_en: element.name_en,
  }))
  return res
}

async function AddAMC() {
  try {
    const res = await httpRequest_SEC.get<IAMC_old[]>('/FundFactsheet/fund/amc')
    const data = MapToAMCModel(res.data)
    const count = await prisma.aMC.createMany({ data })
    console.log(count)
  } catch (err) {
    console.log(err.response.data)
  }
}

AddAMC()
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
