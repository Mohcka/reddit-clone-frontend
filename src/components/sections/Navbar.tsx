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

  // TODO: Send links to UI component as props
  return <NavbarMUI isAuthenticated={isAuthenticated} />
}
