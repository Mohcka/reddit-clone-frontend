import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import RedditIcon from '@material-ui/icons/Reddit'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SignoutButtonMUI from '../auth/SignoutButtonMUI'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { NavbarDummyProps } from './Navbar'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {},
    title: {
      flexGrow: 1,
    },
    navLink: {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  })
)

const NavbarMUI: React.FC<NavbarDummyProps> = ({
  isAuthenticated,
  userInfo,
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleUserMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <RedditIcon />
            <Link to="/" className={classes.navLink}>
              Reddit Clone
            </Link>
          </Typography>

          <Link to="/about" className={classes.navLink}>
            <Button color="inherit">About</Button>
          </Link>

          {/* Login/Logout */}
          {!isAuthenticated ? (
            <Link to="/login" className={classes.navLink}>
              <Button
                color="inherit"
                onClick={() => console.log(isAuthenticated)}
              >
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Button
                color="inherit"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleUserMenuClick}
                startIcon={<ArrowDropDownIcon />}
              >
                Hello {userInfo.userName}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>
                  <SignoutButtonMUI />
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarMUI
