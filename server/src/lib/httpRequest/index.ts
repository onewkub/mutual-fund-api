import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
interface IHeader {
  key: string
  value: string
}
class HttpRequest {
  axiosInstance: AxiosInstance
  constructor(url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
    })
    this.axiosInstance.defaults.headers['Content-Type'] =
      'application/x-www-form-urlencoded'

    this.axiosInstance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      },
    )

    // Add a response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Do something with response data
        return response
      },
      (error) => {
        // const {
        //   config,
        //   response: { status },
        // } = error
        // const originalRequest = config
        // Do something with response error
        // if (status === 421) {
        //   return new Promise((resolve, reject) => {
        //     console.log('waiting for 300 second')
        //     setTimeout(
        //       () => resolve(this.axiosInstance(originalRequest)),
        //       1000 * 300,
        //     )
        //   })
        // }
        return Promise.reject(error)
      },
    )
  }

  setHeader(header: IHeader) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value
  }

  get<type>(methodName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<type>(methodName, config)
  }

  post<type>(methodName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<type>(methodName, data, config)
  }

  put<type>(methodName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<type>(methodName, data, config)
  }

  delete<type>(methodName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<type>(methodName, config)
  }

  // request(type, url, data) {
  //   let promise = null
  //   switch (type) {
  //     case 'GET':
  //       promise = axios.get(url, data)
  //       break
  //     case 'POST':
  //       promise = axios.post(url, data)
  //       break
  //     case 'PUT':
  //       promise = axios.put(url, data)
  //       break
  //     case 'DELETE':
  //       promise = axios.delete(url, data)
  //       break
  //     default:
  //       promise = axios.get(url, data)
  //       break
  //   }
  //   return promise
  // }
}
// const httpRequest = new HttpRequest()

export default HttpRequest
