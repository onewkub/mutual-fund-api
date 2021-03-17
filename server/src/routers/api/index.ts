import { Router } from 'express'
import { getFund } from '../../controller/Fund'
import { getOntologyFund } from '../../controller/Ontology'
import { getOptimalFundSet } from '../../controller/Optimize'
import { getPrediction } from '../../controller/Prediction'

const router = Router()

router.get('/fund', getFund)

router.get('/ontology_fund', getOntologyFund)

router.get('/optimal_fund', getOptimalFundSet)

router.get('/prediction_fund', getPrediction)

export default router
