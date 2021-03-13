import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'
// const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: [path.resolve(__dirname, '../routers/*.ts')],
}

const specs = swaggerJsdoc(options)

export default specs
