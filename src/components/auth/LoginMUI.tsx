import React from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { LoginUIProps } from './Login'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
)

/** Dummy component for login UI using Material-UI */
const LoginMUI: React.FC<LoginUIProps> = ({
  handleAuthenticate,
  handleChange,
  loginCredentials,
}) => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h2">Login</Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="userName"
          variant="outlined"
          label="Username"
          value={loginCredentials.username}
          onChange={handleChange('username')}
        />
        <TextField
          id="password"
          variant="outlined"
          type="password"
          label="Password"
          value={loginCredentials.password}
          onChange={handleChange('password')}
        />

        <br />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleAuthenticate()}
        >
          Login
        </Button>
      </form>
    </Container>
  )
}

export default LoginMUI
