import { Router } from 'express'
import { getFund } from '../../controller/Fund'

const router = Router()

router.get('/fund', getFund)

// router.get('/ontology_fund', getOntologyFund)

export default router
