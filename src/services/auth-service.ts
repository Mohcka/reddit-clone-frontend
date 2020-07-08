import axios from 'axios'
import { TokenLocalStorage } from '../utils/token-storage'
import { AuthenticateResponseDTO } from '../models/dto/authenticate-response-dto'

export interface IAuthService {
  /**
   * Attempts to authenticate the user
   * @param cb callback to run after user has been authed
   */
  authenticate(): Promise<any>
  getUser(): Promise<UserInfoResponseDTO>
  /**
   * De-authenticates user
   * @param cb callback to run after user has been signed out
   */
  signout(): Promise<any>
}

export interface AuthPathsConfig {
  baseUrl: string
  tokenRequestUrl?: string
  refreshTokenRequestUrl?: string
  revokeTokenRequestUrl?: string
}

export interface IAuthPaths extends AuthPathsConfig {}

/** An object of paths that the AuthService is expected to use */
export const AuthPaths = (config: AuthPathsConfig) => ({
  baseUrl: config.baseUrl,
  tokenRequestUrl: `${config.baseUrl}${config.tokenRequestUrl}`,
  refreshTokenRequestUrl: `${config.baseUrl}${config.refreshTokenRequestUrl}`,
  revokeTokenRequestUrl: `${config.baseUrl}${config.revokeTokenRequestUrl}`,
})

export class FakeAuthService implements IAuthService {
  isAuthenticated = false

  /**
   * Simulates an authentication
   * @param cb logic to run after authenticated
   */
  authenticate(): Promise<void> {
    return new Promise((res) => {
      this.isAuthenticated = true
      // setTimeout(cb, 100) // fake async
      res()
    })
  }

  signout() {
    return new Promise((res) => {
      this.isAuthenticated = false
      res()
    })
  }
}

interface jwtResponseDTO {
  id: string
  username: string
  token: string
}

export class JwtAuthService implements IAuthService {
  /** Url used to communcicate with server for authorization */
  private readonly authUrl: string
  private headers: Headers = new Headers()

  constructor(private authPathsConfig: IAuthPaths) {
    this.authUrl = authPathsConfig.baseUrl

    this.setupHeaders()
  }

  private setupHeaders() {
    this.headers.append('Content-Type', 'application/json')
    this.headers.append('Accept', 'application/json')
  }

  authenticate(): Promise<AuthenticateResponseDTO> {
    return axios
      .post<AuthenticateResponseDTO>(`${this.authUrl}`, {
        username: 'Name',
        password: 'test',
      })
      .then((resp) => {
        if (resp.status !== 200) throw new Error(resp.statusText)

        // Store token in local storage
        TokenLocalStorage.storeToken(resp.data.token)
        // From this point, axios will authorize with received token
        axios.defaults.headers['Authorization'] = `Bearer ${TokenLocalStorage.getToken()}`
        return resp.data
      })
      .then((data) => data)
  }

  authCheck() {}

  signout(): Promise<void> {
    return fetch(`${this.authUrl}/signout`, { method: 'GET' })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText)

        return resp.json()
      })
      .then((data) => data)
  }
}
