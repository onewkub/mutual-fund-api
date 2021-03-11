import express from 'express'
import { Request, Response } from 'express'

import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger'

const server = express()
const PORT = 8080

server.get('/', (req: Request, res: Response) => {
  res.send(
    'Hello This is server of My Project Yeah!! TypeScript + Express + Nodemon',
  )
})

server.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

server.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`)
})
