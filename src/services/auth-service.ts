import { responsiveFontSizes } from '@material-ui/core'
import { CookieHelper } from '../utils/cookie-helpers'

export interface IAuthService {
  /**
   * Attempts to authenticate the user
   * @param cb callback to run after user has been authed
   */
  authenticate(): Promise<any>
  /**
   * De-authenticates user
   * @param cb callback to run after user has been signed out
   */
  signout(): Promise<any>
}

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
  private token: string = ""
  private headers: Headers = new Headers()

  constructor(apiUrl: string) {
    this.authUrl = apiUrl
    
    this.setupHeaders()
  }

  private setupHeaders() {
    this.headers.append('Content-Type', 'application/json')
    this.headers.append('Accept', 'application/json')
  }

  authenticate(): Promise<jwtResponseDTO> {
    return fetch(`${this.authUrl}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username: 'Name', password: 'test' }),
    })
      .then(async (resp) => {
        // Throw error to consumer to handle on it's end
        if (!resp.ok) {
          const text = await resp.text()
          throw new Error(JSON.parse(text).message)
        }

        return resp.json() as Promise<jwtResponseDTO>
      })
      .then((data) => {
        console.log(data)
        // Store the token 
        // TODO: do NOT store token in browser cookie
        return data
      })
  }

  authCheck(){

  }

  signout(): Promise<void> {
    return fetch(`${this.authUrl}/signout`, { method: 'GET' })
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText)

        return resp.json()
      })
      .then((data) => data)
  }
}
