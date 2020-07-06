import { createContext, SetStateAction, Dispatch } from 'react'
import { IAuthService, FakeAuthService, JwtAuthService } from '../../services/auth-service'

export interface IAuthContext {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  /** Injected auth service for checking authentication from server */
  authService: IAuthService
}

export const fakeAuthService = new FakeAuthService();
export const jwtAuthService = new JwtAuthService(`https://localhost:5001/api/users`);

/**
 * Context used to provide the authentication service
 */
export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  authService: fakeAuthService
});
