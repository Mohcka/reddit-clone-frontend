import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import NavbarMUI from './NavbarMUI'

/** Props for Navbar UI components */
export interface NavbarDummyProps {
  /** Flag declaring whether a user is logged in or not */
  isAuthenticated: boolean
}


export default function Navbar() {
  // Only need to check if authenticated here
  const { isAuthenticated } = useContext(AuthContext)

  return <NavbarMUI isAuthenticated={isAuthenticated} />
}
