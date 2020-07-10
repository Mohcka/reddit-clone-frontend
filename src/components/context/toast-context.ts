import React, { Dispatch, SetStateAction } from 'react'

export type IsToastOpenType = {
  isOpen: boolean
  message: string
  type: 'success' | 'error' | undefined
}

export interface IToaster {
  isToastOpen: IsToastOpenType
  setIsToastOpen: Dispatch<SetStateAction<IsToastOpenType>>
}

export const Toaster: IToaster = {
  isToastOpen: {
    isOpen: false,
    message: '',
    type: undefined
  },
  setIsToastOpen: () => {},
}

export const ToastContext = React.createContext(Toaster)
