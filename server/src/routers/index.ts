import { Router, Request, Response } from 'express'

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

export default router
