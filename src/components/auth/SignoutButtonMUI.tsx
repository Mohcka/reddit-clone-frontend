import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../context/AuthContext'
import { TokenLocalStorage } from '../../utils/token-storage'

const SignoutButton = () => {
  const history = useHistory()
  const { setIsAuthenticated, authService } = useContext(AuthContext)

  const signout = () => {
    // TODO: Look for alternaitve, drop local storage
    TokenLocalStorage.clearToken()
    setIsAuthenticated(false)
    history.push('/')
  }

  return (
    <Button color="inherit" onClick={() => signout()}>
      Signout
    </Button>
  )
}

export default SignoutButton
