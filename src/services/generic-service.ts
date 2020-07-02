import axios, { AxiosResponse } from 'axios'

/**
 * @template T s
 */
export interface ApiWebService<T> {
  getAll(): Promise<T[]>
}

// TODO: add docs
/**
 * 
 * @template T The data model that's expected from the server
 */
export default abstract class BaseService<T> {
  protected readonly apiUrl: string = ''
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  // TODO: add docs
  /**
   * */
  getAll(): Promise<void | Array<T>> {
    return axios
      .get(this.apiUrl)
      .then((resp: AxiosResponse<Array<T>>) => resp.data)
      .catch((err) => {
        console.error(`Err from generic-service: ${err}`)
      })
  }
}
