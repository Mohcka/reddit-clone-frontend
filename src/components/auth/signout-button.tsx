import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import Button from '@material-ui/core/Button'

import Swal from 'sweetalert2'

import { AuthContext } from '../context/AuthContext'

const SignoutButton = () => {
  const history = useHistory()
  const { setIsAuthenticated, authService } = useContext(AuthContext)

  const signout = () => {
    authService
      .signout()
      .then(() => {
        // Signout out was success
        setIsAuthenticated(false)
        history.push('/')
      })
      .catch((err) => {
        // return home
        history.push('/')
        // Display error to client
        Swal.fire({
          icon: 'error',
          title: 'An Error has occured',
          text: `${err}`,
        })
      })
  }

  return (
    <Button color="inherit" onClick={() => signout()}>
      Signout
    </Button>
  )
}

export default SignoutButton
