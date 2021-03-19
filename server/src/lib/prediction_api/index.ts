import HttpRequest from '../httpRequest'

export const httprequest_prediction = new HttpRequest( process.env.PREDICT_API || 'http://localhost:8000')
