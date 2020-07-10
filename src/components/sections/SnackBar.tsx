import React, { useContext, Dispatch, SetStateAction } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'

import { makeStyles, Theme } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import { Toaster, ToastContext, IsToastOpenType } from '../context/toast-context';

export interface SnackbarProps {
  handleOpen?: () => void
  setSnackbarIsOpen: Dispatch<SetStateAction<IsToastOpenType>>
  isSnackbarOpen: IsToastOpenType
}

const SnackBar: React.FC<SnackbarProps> = ({isSnackbarOpen, setSnackbarIsOpen}) => {


  const _handleClose = (e?: React.SyntheticEvent, reason?: string) => {
    if(reason === 'clickaway') return;
    
    setSnackbarIsOpen({
      ...isSnackbarOpen,
      isOpen: false,
    })
  }

  return (
    <Snackbar open={isSnackbarOpen.isOpen} autoHideDuration={6000} onClose={_handleClose}>
      <Alert onClose={_handleClose} severity={isSnackbarOpen.type}>
        {isSnackbarOpen.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
