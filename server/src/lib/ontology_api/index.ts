import HttpRequest from '../httpRequest'

const prefix = `PREFIX mat: <http://www.semanticweb.org/mutual-fund#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>`

export const httpRequest_ontology = new HttpRequest(
  'http://localhost:3030/mutual-fund',
)

export async function updateOntology(command: string) {
  const update: string = `${prefix} ${command}`
  // console.log(path)
  try {
    const res = await httpRequest_ontology.post('/', null, {
      params: {
        update,
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return err
  }
}

export async function queryOntology(command: String) {
  const query: string = `${prefix} ${command}`
  try {
    const res = await httpRequest_ontology.post(`/`, null, {
      params: {
        query,
        output: 'json',
      },
    })
    return res.data
  } catch (err) {
    console.log(err)
    return err
  }
}

export interface IFundInsert {
  project_id: string
  project_name: string
  // project_class_name: string
  project_loss?: number
  project_risk?: number
  project_policy?: string
  project_dividend?: boolean
}

export interface IAssetInsert {
  asset_id: string
  asset_name: string
  asset_symbol: string
}

const patuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]/g

export async function addInvestRelation(project_id: string, asset_id: string) {
  asset_id = asset_id.replace(patuation, '').trim()
  const command = `
  INSERT{
    ?fund mat:invest mat:${asset_id}
  }
  WHERE{
    ?fund mat:project_id  "${project_id}"^^xsd:string
  }
  `
  try {
    await updateOntology(command)
    console.log(`Insert invest from ${project_id} => ${asset_id}`)
  } catch (err) {
    console.log(err)
  }
}

export async function addAssetOntology(asset: IAssetInsert) {
  asset = {
    ...asset,
    asset_id: asset.asset_id.replace(patuation, '').trim(),
  }
  const command = `
  INSERT DATA{
    mat:${asset.asset_id} rdf:type mat:asset;
    mat:asset_id "${asset.asset_id}"^^xsd:string;
    mat:asset_name "${asset.asset_name}"^^xsd:string;
    mat:asset_symbol "${asset.asset_symbol}"^^xsd:string.
  }
  `
  try {
    updateOntology(command)
  } catch (err) {
    console.log(err)
  }
}

export async function addFundOntology(fund: IFundInsert) {
  fund = {
    ...fund,
    project_name: fund.project_name.replace(patuation, '').trim(),
  }
  if (!fund.project_policy) {
    console.log(fund)
  }
  let command = `
  INSERT DATA { 
    mat:${fund.project_name} rdf:type mat:fund;
    rdf:type mat:${fund.project_policy};
    mat:project_id "${fund.project_id}"^^xsd:string;
    mat:project_name "${fund.project_name}"^^xsd:string;
    mat:risk_rate "${fund.project_risk}"^^xsd:integer;
  ${fund.project_dividend ? `rdf:type mat:dividend;` : ''}
  ${
    fund.project_loss
      ? `mat:project_loss "${fund.project_loss}"^^xsd:decimal .`
      : ''
  } 
  }`
  try {
    console.log(`insert ${fund.project_name}`)
    await updateOntology(command)
  } catch (err) {
    console.log(err)
  }
}

// function getProjectClass(dividend: boolean) {
//   if (dividend) {
//     return 'dividend'
//   }
//   // switch (className) {
//   //   case 'ชนิดสะสมมูลค่า':
//   //     return 'accumurate'
//   //   case 'ชนิดจ่ายเงินปันผล':
//   //     return 'dividen'
//   //   case ''
//   //   default:
//   //     return 'other'
//   // }
// }

const mock_data: IFundInsert = {
  project_id: 'M0643_2555',
  // project_class_name: 'ชนิดสะสมมูลค่า',
  project_loss: -27.592499999999998,
  project_name: 'SCBS&P500A',
  project_policy: 'equity_fund',
  project_risk: 6,
  project_dividend: false,
}

function test() {
  try {
    addFundOntology(mock_data)
  } catch (err) {
    console.log(err)
  }
}

// test()
