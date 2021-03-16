import { queryOntology } from '../../lib/ontology_api'
import { parseOntologyToNormalJson } from '../../lib/ontology_parse'
import prisma from '../../lib/prisma'

export async function getFundSQL(project_id?: string) {
  if (project_id) {
    try {
      const res = await prisma.fund.findUnique({
        where: {
          projid: project_id,
        },
      })
      return res
    } catch (err) {
      console.log(err)
      return err
    }
  } else {
    try {
      const res = await prisma.fund.findMany()
      return res
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

export async function getFundOntology(loss: number, dividend: boolean) {
  const command = `
  SELECT ?project_id ?project_name ?project_loss ?risk_rate
  WHERE{
    ?fund mat:project_id ?project_id;
          mat:project_name ?project_name;
          mat:project_loss ?project_loss;
          mat:risk_rate ?risk_rate;
          ${dividend ? 'rdf:type mat:dividend;' : ''}
    filter ( ?project_loss >= -${loss * 1.25} && ?project_loss <= -${
    loss * 0.75
  } )
  }
  ORDER BY DESC(?project_loss)
  `
  // console.log(command)
  try {
    const res = await queryOntology(command)
    return parseOntologyToNormalJson(res)
  } catch (err) {
    console.log(err)
    return err
  }
}
