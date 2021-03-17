import { Router } from 'express'
import { getFund } from '../../controller/Fund'
import { getOntologyFund } from '../../controller/Ontology'
import { getOptimalFundSet } from '../../controller/Optimize'

const router = Router()

router.get('/fund', getFund)

router.get('/ontology_fund', getOntologyFund)

router.get('/optimal_fund', getOptimalFundSet)

export default router
