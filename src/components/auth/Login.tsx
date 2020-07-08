import React, { useContext, useState } from 'react'
import { useHistory, Redirect, useLocation } from 'react-router-dom'
import { Location } from 'history'

import Swal from 'sweetalert2'

import { AuthContext } from '../context/AuthContext'
import LoginMUI from './LoginMUI'
import { AuthenticateResponseDTO } from '../../models/dto/authenticate-response-dto'
import { UserCredentialsRequestDTO } from '../../models/dto/user-credentials-request-dto'

/** Login props for dummy-display login compoenents */
export interface UILoginProps {
  /**
   * Credentials used to authenticate a user
   */
  loginCredentials: UserCredentialsRequestDTO
  handleAuthenticate: () => void
  handleChange: (prop: keyof UserCredentialsRequestDTO) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Login = () => {
  // Gather info for redirecting user
  const history = useHistory()
  const location = useLocation<{ from: Location }>()
  // Credentials used to authenticate a user
  const [loginCredentials, setLoginCredentials] = useState<
    UserCredentialsRequestDTO
  >({
    username: '',
    password: '',
  })

  const { from } = location.state || { from: { pathname: '/' } }

  // Take global auth context
  const {
    isAuthenticated,
    setIsAuthenticated,
    authService,
    setUserInfo,
  } = useContext(AuthContext)

  const handleChange = (prop: keyof UserCredentialsRequestDTO) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.currentTarget.value)
    setLoginCredentials({ ...loginCredentials, [prop]: e.currentTarget.value })
  }

  const authenticate = () => {
    authService
      .authenticate(loginCredentials)
      .then((data: AuthenticateResponseDTO) => {
        // on promise success, authorize
        Swal.fire('Logged in')
        setIsAuthenticated(true)
        setUserInfo({ userId: data.id, userName: data.username })
        // Go back to last known page or home
        history.replace(from)
      })
      .catch((err) => {
        // Display error to client
        Swal.fire({
          icon: 'error',
          title: 'An Error has occured',
          text: `${err}`,
        })
      })
  }

  return !isAuthenticated ? (
    <LoginMUI
      handleAuthenticate={authenticate}
      loginCredentials={loginCredentials}
      handleChange={handleChange}
    />
  ) : (
    <Redirect to="/" />
  )
}

export default Login
