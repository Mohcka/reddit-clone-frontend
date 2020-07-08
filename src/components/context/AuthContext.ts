import { createContext, SetStateAction, Dispatch } from 'react'
import {
  IAuthService,
  FakeAuthService,
  JwtAuthService,
} from '../../services/auth-service'

export interface UserInfo {
  userId: string | null
  userName: string | null
}
export interface IAuthContext {
  /** Flag for stating whether a user is logged in or not */
  isAuthenticated: boolean
  /** Used to update the global state of the user's authentication */
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  /** User's credentials used throughout the application */
  userInfo: UserInfo
  /** Used to update the user's information throught the application */
  setUserInfo: Dispatch<SetStateAction<UserInfo>>
  /** Injected auth service for checking authentication from server */
  authService: IAuthService
}

export const fakeAuthService = new FakeAuthService()
export const jwtAuthService = new JwtAuthService({
  baseUrl: 'https://localhost:5001/api/users',
})

/**
 * Context used to provide the authentication service
 */
export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userInfo: {
    userId: null,
    userName: null,
  },
  setUserInfo: () => {},
  authService: fakeAuthService,
})
