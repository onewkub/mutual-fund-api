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
  await httpRequest_ontology.post(`?update=${prefix} ${command}`)
}

export async function queryOntology(command: String) {
  await httpRequest_ontology.post(`?query=${prefix} ${command}`)
}
