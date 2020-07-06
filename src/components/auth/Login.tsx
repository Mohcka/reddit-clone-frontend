import React, { useContext } from 'react'
import { useHistory, Redirect, useLocation } from 'react-router-dom'
import { Location } from 'history'

import Swal from 'sweetalert2'

import { AuthContext } from '../context/AuthContext'
import LoginMUI from './LoginMUI'

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
  const { isAuthenticated, setIsAuthenticated, authService } = useContext(
    AuthContext
  )

  const authenticate = () => {
    // authService.authenticate((
    console.log('huh')
    authService
      .authenticate()
      .then(() => {
        // on promise success, authorize
        Swal.fire('Logged in')
        setIsAuthenticated(true)
        console.log(isAuthenticated)
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
