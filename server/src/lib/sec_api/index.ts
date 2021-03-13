import HttpRequest from '../httpRequest'

export const httpRequest_SEC = new HttpRequest('https://api.sec.or.th')
httpRequest_SEC.setHeader({
  key: 'Ocp-Apim-Subscription-Key',
  value: '02e827bbdcb540d48b07d08a22715302',
})
