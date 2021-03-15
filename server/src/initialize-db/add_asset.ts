import { IAsset } from '../interface/SEC'
import {
  addAssetOntology,
  addInvestRelation,
  IAssetInsert,
} from '../lib/ontology_api'
import { httpRequest_SEC } from '../lib/sec_api'

export async function addTop5Asset(project_id: string) {
  const currentDate = `202101`
  try {
    const res = await httpRequest_SEC.get<IAsset[]>(
      `/FundFactsheet/fund/${project_id}/FundTop5/${currentDate}`,
    )
    if (Array.isArray(res.data)) {
      const data = res.data.map((element) => mapAssetToInsertForm(element))
      await Promise.all(data.map((element) => addAssetToOntology(element)))
      await Promise.all(
        data.map((element) => addInvestRelation(project_id, element.asset_id)),
      )
    }
  } catch (err) {
    console.log(err)
  }
}

function mapAssetToInsertForm(asset: IAsset): IAssetInsert {
  return {
    asset_id: asset.secur_abbr_name,
    asset_symbol: asset.secur_abbr_name,
    asset_name: asset.secur_name,
  }
}

export async function addAssetToOntology(asset: IAssetInsert) {
  await addAssetOntology(asset)
  console.log(`insert ${asset.asset_id} as asset`)
}

async function test() {
  const project_id = 'M0597_2552'
  await addTop5Asset(project_id)
}

// test()
