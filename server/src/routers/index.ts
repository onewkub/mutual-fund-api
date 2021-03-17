import { Router, Request, Response } from 'express'
import api_router from './api'
const router = Router()
/**
 * @swagger
 * /test:
 *    get:
 *      description: "Just test and swagger"
 */
router.get('/test', (req: Request, res: Response) => {
  // console.log(req)
  res.send("Hello I'm here for you!!")
})
router.use('/', api_router)

export default router
