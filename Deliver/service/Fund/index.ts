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
    } finally {
      prisma.$disconnect()
    }
  } else {
    try {
      const res = await prisma.fund.findMany()
      return res
    } catch (err) {
      console.log(err)
      return err
    } finally {
      prisma.$disconnect()
    }
  }
}

export enum Risk {
  low = 1,
  medium = 2,
  high = 3,
}

const riskValue = {
  1: { start: 1, end: 4 },
  2: { start: 5, end: 6 },
  3: { start: 7, end: 8 },
}

export async function getFundOntology(
  loss: number,
  profit: number,
  dividend: boolean,
  litmit?: number,
  risk?: Risk,
) {
  const command = `
  SELECT ?project_id ?name ?draw_down ?profit ?sd ?risk (?profit+?sd as ?max_profit) (?profit-?sd as ?min_profit)
  WHERE{
    ?fund mat:project_id ?project_id;
          mat:project_name ?name;
          mat:project_loss ?draw_down;
          mat:project_profit ?profit;
          mat:project_sd ?sd;
          mat:risk_rate ?risk;
          ${dividend ? 'rdf:type mat:dividend;' : ''}
          FILTER ( ?draw_down >= ${-loss} && (?sd + ?profit >= ${profit} || ?profit - ?sd >= 0) )
          ${
            risk
              ? `FILTER (?risk >= ${riskValue[risk].start} && ?risk <= ${riskValue[risk].end})`
              : ''
          }
  }
  ORDER BY DESC(?profit+?sd) DESC(?profit-?sd) DESC(?draw_down)
  ${litmit ? `LIMIT ${litmit}` : ''}
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
