import React, { useContext } from 'react'
import { useHistory, Redirect, useLocation } from 'react-router-dom'
import { Location } from 'history'

import Swal from 'sweetalert2'

import { AuthContext } from '../context/AuthContext'
import LoginMUI from './LoginMUI'
import { AuthenticateResponseDTO } from '../../models/dto/authenticate-response-dto'

/** Login props for dummy-display login compoenents */
export interface UILoginProps {
  handleAuthenticate: () => void
}

const Login = () => {
  // Gather info for redirecting user
  const history = useHistory()
  const location = useLocation<{ from: Location }>()

  const { from } = location.state || { from: { pathname: '/' } }

  // Take global auth context
  const {
    isAuthenticated,
    setIsAuthenticated,
    authService,
    setUserInfo,
  } = useContext(AuthContext)

  const authenticate = () => {
    authService
      .authenticate()
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
    <LoginMUI handleAuthenticate={authenticate} />
  ) : (
    <Redirect to="/" />
  )
}

export default Login
