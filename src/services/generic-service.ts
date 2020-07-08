import axios, { AxiosResponse } from 'axios'

/**
 * @template T The data model that's expected from the server
 */
export interface ApiWebService<T> {
  getAll(): Promise<T[]>
  get(id: string): Promise<T>
  create(data: T): Promise<void>
  update(data: T): Promise<void>
}

// TODO: add docs
/**
 *
 * @template T The data model that's expected from the server
 */
export default abstract class BaseService<T> implements ApiWebService<T> {
  protected readonly apiUrl: string = ''
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  // TODO: add docs
  /**
   * */
  getAll(): Promise<Array<T>> {
    return axios
      .get(this.apiUrl)
      .then((resp: AxiosResponse<Array<T>>) => resp.data)
  }

  get(id: string): Promise<T> {
    return axios.get<T>(`${this.apiUrl}/${id}`).then((resp) => resp.data)
  }

  create(data: T): Promise<void> {
    return axios.post(this.apiUrl, data)
  }

  update(data: T): Promise<void> {
    return axios.put(this.apiUrl, data)
  }
}
