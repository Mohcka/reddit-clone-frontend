import axios, { AxiosRequestConfig } from 'axios'

/**
 * Provides functionality for getting and setting tokens in the local storage
 *
 * @see https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
 */
export class TokenLocalStorage {
  private static readonly LOCAL_STORAGE_TOKEN = 'token'
  private static readonly LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token'

  public static isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  public static getAuthetntication(): AxiosRequestConfig {
    return {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    }
  }

  /**
   * Makes a call to the server to retreive and store a new token
   *
   * @param tokenRequestUrl Url to retrieved token from server
   * @param credentials the credentials used to gain access to token
   * @template T The expected type used as credentials for receiveing the token
   */
  public static getNewToken<T>(
    tokenRequestUrl: string,
    credentials: T
  ): Promise<string> {
    return new Promise((resolve, rej) => {
      axios
        .post<{ token: string }>(tokenRequestUrl, { ...credentials })
        .then((resp) => {
          const token = resp.data.token
          // Success, store token
          this.storeToken(token)

          // Resolve and return token
          resolve(token)
        })
        .catch((err) => rej(err))
    })
  }

  /**
   * Stores the provided token to local storage
   * @param token Token to store
   */
  public static storeToken(token: string): void {
    localStorage.setItem(TokenLocalStorage.LOCAL_STORAGE_TOKEN, token)
  }

  public static clearToken(): void {
    localStorage.removeItem(TokenLocalStorage.LOCAL_STORAGE_TOKEN)
  }

  public static getToken(): string | null {
    return localStorage.getItem(TokenLocalStorage.LOCAL_STORAGE_TOKEN)
  }
}
