import React, { useContext } from 'react'
import { AuthContext, UserInfo } from '../context/AuthContext'
import NavbarMUI from './NavbarMUI'

/** Props for Navbar UI components */
export interface NavbarDummyProps {
  /** Flag declaring whether a user is logged in or not */
  isAuthenticated: boolean,
  userInfo: UserInfo
}


export default function Navbar() {
  // Only need to check if authenticated here
  const { isAuthenticated, userInfo } = useContext(AuthContext)

  // TODO: Send links to UI component as props
  return <NavbarMUI isAuthenticated={isAuthenticated} userInfo={userInfo} />
}
