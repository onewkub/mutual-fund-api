import { IAMC } from '../interface/AMC'
import { IAMC_SEC } from '../interface/SEC'
import prisma from '../lib/prisma'
import { httpRequest_SEC } from '../lib/sec_api'

function MapToAMCModel(data: IAMC_SEC[]): IAMC[] {
  const res: IAMC[] = data.map((element) => ({
    id: element.unique_id,
    name_th: element.name_th,
    name_en: element.name_en,
  }))
  return res
}

async function AddAMC() {
  try {
    console.log('Fetching AMC data from SEC....')
    const res = await httpRequest_SEC.get<IAMC_SEC[]>('/FundFactsheet/fund/amc')
    console.log('Fetching AMC data success')

    const data = MapToAMCModel(res.data)

    console.log('Insert AMC data to Local Database....')

    await prisma.aMC.createMany({ data })

    console.log('Insert AMC data success')
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
