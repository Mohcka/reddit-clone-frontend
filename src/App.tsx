import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/sections/Navbar'
import { AuthContext, jwtAuthService } from './components/context/AuthContext'
import { TokenLocalStorage } from './utils/token-storage'

const App = () => {
  // Set global state for context
  const [isAuthenticated, setIsAuthenticated] = useState(TokenLocalStorage.isAuthenticated());
  const value = {isAuthenticated, setIsAuthenticated, authService: jwtAuthService}

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
