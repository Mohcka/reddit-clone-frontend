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

  public static staticInitAxiosTokenHandling(handleSignoutCB: () => any) {
    if (TokenLocalStorage.isAuthenticated())
      Axios.defaults.headers[
        'Authorization'
      ] = `Bearer ${TokenLocalStorage.getToken()}`

    Axios.interceptors.response.use(
      (config) => {
        return config
      },
      (err) => {
        // Return if error was not Unauthorized
        if (err.response.status !== 401) return Promise.reject(err)

        // Unauthorized - remove token
        TokenLocalStorage.clearToken()

        // sign user out
        handleSignoutCB()

        return Promise.reject(err)
      }
    )
  }

  public static staticSetupAxiosTokenAuthResponseInterceptor(
    handleSignout: () => {}
  ) {
    Axios.interceptors.response.use(
      (config) => {
        return config
      },
      (err) => {
        // Return if error was not Unauthorized
        if (err.response.status !== 401) return Promise.reject(err)

        // Unauthorized - remove token
        TokenLocalStorage.clearToken()

        // sign user out
        handleSignout()
        return Promise.reject(err)
      }
    )
  }

  get axiosInstance(): AxiosInstance {
    return this.axiosInstance
  }
}
