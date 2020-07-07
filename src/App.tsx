import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes/Routes'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import { AuthContext, jwtAuthService } from './components/context/AuthContext'
import { TokenLocalStorage } from './utils/token-storage'
import { AxiostHttpClientHelper } from './utils/axios-interceptors-herlper'

const App = () => {
  const history = useHistory()

  // Set global state for context
  const [isAuthenticated, setIsAuthenticated] = useState(TokenLocalStorage.isAuthenticated());
  const value = {isAuthenticated, setIsAuthenticated, authService: jwtAuthService}

  // Setup http client for handling token authentication
  // before starting application
  AxiostHttpClientHelper.staticInitAxiosTokenHandling(() => {
    setIsAuthenticated(false)
    history.push('/')
  })

    return (
      <AuthContext.Provider value={value}>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </AuthContext.Provider>
    )
}

export const launch = () => {
  if (document.getElementById('app'))
    ReactDOM.render(<App />, document.getElementById('app'))
}
