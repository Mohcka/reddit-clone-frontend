import React, { useContext } from 'react'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Location } from 'history'
import { AuthContext } from '../../context/AuthContext'

// import Swal from 'sweetalert2'

import { UserCredentialsRequestDTO } from '../../../models/dto/user-credentials-request-dto'
import { AuthenticateResponseDTO } from '../../../models/dto/authenticate-response-dto'
import Login from '../../auth/Login'
import { RoutesConfig } from '../../../config/routes-config'
import { ToastContext } from '../../context/toast-context'

const LoginPage = () => {
  const history = useHistory()
  const location = useLocation<{ from: Location }>()

  const { from } = location.state || { from: { pathname: '/' } }

  const {
    isAuthenticated,
    setIsAuthenticated,
    authService,
    setUserInfo,
  } = useContext(AuthContext)

  const toastContext = useContext(ToastContext)

  const handleAuthentication = (
    loginCredentials: UserCredentialsRequestDTO
  ) => {
    authService
      .authenticate(loginCredentials)
      .then((data: AuthenticateResponseDTO) => {
        // on promise success, authorize
        // Swal.fire('Logged in')
        toastContext.setIsToastOpen({
          isOpen: true,
          message: "You're Now Logged In!",
          type: 'success',
        })
        setIsAuthenticated(true)
        setUserInfo({ userId: data.id, userName: data.username })
        // Go back to last known page or home
        history.replace(from)
      })
      .catch((err) => {
        // Display error to client
        toastContext.setIsToastOpen({
          isOpen: true,
          message: 'Invalid Credentials',
          type: 'error',
        })
        // Swal.fire({
        //   icon: 'error',
        //   title: 'An Error has occured',
        //   text: `${err}`,
        // })
      })
  }

  return !isAuthenticated ? (
    <Login handleAuthentication={handleAuthentication} />
  ) : (
    <Redirect to={RoutesConfig.home} />
  )

  return <div></div>
}

export default LoginPage
