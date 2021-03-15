import { Router } from 'express'
import { getFund } from '../../controller/Fund'

const router = Router()

router.get('/fund', getFund)

export default router
