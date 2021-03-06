import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes/Routes'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import {
  AuthContext,
  jwtAuthService,
  UserInfo,
} from './components/context/AuthContext'
import { TokenLocalStorage } from './utils/token-storage'
import { AxiostHttpClientHelper } from './utils/axios-interceptors-herlper'
import { UserInfoResponseDTO } from './models/dto/user-info-response-dto'
import SnackBar from './components/sections/SnackBar'
import { ToastContext, IsToastOpenType } from './components/context/toast-context'

const App = () => {
  const history = useHistory()

  // Set global state for context
  const [isAuthenticated, setIsAuthenticated] = useState(
    TokenLocalStorage.isAuthenticated()
  )
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: null,
    userName: null,
  })
  const globalAuthValue = {
    isAuthenticated,
    setIsAuthenticated,
    userInfo,
    setUserInfo,
    authService: jwtAuthService,
  }

  // * Setup toast context
  const [isToastOpen, setIsToastOpen] = useState<IsToastOpenType>({
    isOpen: false,
    message: '',
    type: undefined
  })

  const globalToastValue = {
    isToastOpen,
    setIsToastOpen,
  }

  // Setup http client for handling token authentication
  // before starting application
  AxiostHttpClientHelper.staticInitAxiosTokenHandling(() => {
    // Handle condition where token is invalid
    setIsAuthenticated(false)
    history.push('/')
  })

  // TODO: This feels bad, figure out alternative for determining if a user is logged in on app startup
  // fetch and set user
  if (isAuthenticated) {
    jwtAuthService.getUser().then((data: UserInfoResponseDTO) => {
      setUserInfo(data)
    })
  }

  return (
    <AuthContext.Provider value={globalAuthValue}>
      <ToastContext.Provider value={globalToastValue}>
      <SnackBar isSnackbarOpen={isToastOpen} setSnackbarIsOpen={setIsToastOpen} />
      <Router>
        <Navbar />
        <Routes />
      </Router>
      </ToastContext.Provider>
    </AuthContext.Provider>
  )
}

export const launch = () => {
  if (document.getElementById('app'))
    ReactDOM.render(<App />, document.getElementById('app'))
  else console.error('No #app element found, app did not launch')
}
