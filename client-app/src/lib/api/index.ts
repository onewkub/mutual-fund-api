import HttpRequest from 'lib/httpRequest'

export const httpRequest = new HttpRequest( process.env.SERVER_API_URL ||'http://localhost:8080/api')
