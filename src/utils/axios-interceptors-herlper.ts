import Axios, { AxiosInstance } from 'axios'
import { TokenLocalStorage } from './token-storage'

export class AxiostHttpClientHelper {
  public static axiosInstance = Axios.create()

  public setupAxiosTokenAuthRequestInterceptor() {
    return this.axiosInstance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        // Return if error was not Unauthorized
        if (err.response.status !== 401) return Promise.reject(err)

        // Unauthorized - remove token
        TokenLocalStorage.clearToken()

        return Promise.reject(err)
      }
    )
  }

  public static staticInitAxiosTokenHandling() {
    if (TokenLocalStorage.isAuthenticated())
      Axios.defaults.headers[
        'Authorization'
      ] = `Bearer ${TokenLocalStorage.getToken()}`

      this.staticSetupAxiosTokenAuthRequestInterceptor()
  }

  public static staticSetupAxiosTokenAuthRequestInterceptor() {
    Axios.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        // Return if error was not Unauthorized
        if (err.response.status !== 401) return Promise.reject(err)

        // Unauthorized - remove token
        TokenLocalStorage.clearToken()

        return Promise.reject(err)
      }
    )
  }

  get axiosInstance(): AxiosInstance {
    return this.axiosInstance
  }
}
