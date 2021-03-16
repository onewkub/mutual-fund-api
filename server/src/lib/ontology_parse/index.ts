export interface IOntolgyOutput {
  head: {
    vars: string[]
  }
  results: {
    bindings: any[]
  }
}
export function parseOntologyToNormalJson(input: IOntolgyOutput) {
  // console.log(input)
  const prop = input.head.vars
  const output = input.results.bindings.map((element) => {
    let rlt: any = {}
    prop.forEach((key) => {
      rlt[key] = element[key].value
    })
    return rlt
  })
  return output
}
