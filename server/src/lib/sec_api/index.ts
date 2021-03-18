import HttpRequest from '../httpRequest'

export const httpRequest_SEC = new HttpRequest('https://api.sec.or.th')
httpRequest_SEC.setHeader({
  key: 'Ocp-Apim-Subscription-Key',
  value: '02e827bbdcb540d48b07d08a22715302',
})

export const httpRequest_SEC_daily = new HttpRequest('https://api.sec.or.th')

httpRequest_SEC_daily.setHeader({
  key: 'Ocp-Apim-Subscription-Key',
  value: '75b9975688264b8b89ea63d9b7f54baf',
})
