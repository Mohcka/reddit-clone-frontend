import React, { useContext, useState, useEffect } from 'react'
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import Home from '../components/pages/Home'
import { About } from '../components/pages/About'
import NoMatch from '../components/NoMatch'
import { AuthContext, fakeAuthService } from '../components/context/AuthContext'
import { IAuthService, FakeAuthService } from '../services/auth-service'
import Login from '../components/auth/Login'
import CreatePost from '../components/pages/CreatePost'
import {
  ApiServiceContext,
  ApiServices,
} from '../components/context/ApiContext'
import EditPost from '../components/pages/posts/EditPost'
import { RoutesConfig } from '../config/routes-config'
import LoginPage from '../components/pages/auth/LoginPage'
import ShowPost from '../components/pages/posts/ShowPost'
import { AddComment } from '../components/pages/comments/AddComment'
import EditComment from '../components/pages/comments/EditComment'

/**
 * Specialized route for redirecting user to login screen if they
 * aren't authenticated yet.
 */
const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  // Take auth service from Global provider
  const { isAuthenticated } = useContext(AuthContext)

  // TODO: check in with the server on every request of a private route
  //       in case a token has expired
  useEffect(() => {}, [])

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          // redirect to login page, sending state of previous location
          // to send the user back if need be
          // more info here: https://reactrouter.com/web/api/Redirect
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export const Routes = () => {
  return (
    <ApiServiceContext.Provider value={ApiServices}>
      <Switch>
        <Route path={`${RoutesConfig.posts.show}/:id`} component={ShowPost} />

        <PrivateRoute path="/create-post">
          <CreatePost />
        </PrivateRoute>

        <PrivateRoute path={`${RoutesConfig.posts.edit}/:id`}>
          <EditPost />
        </PrivateRoute>

        <PrivateRoute path={`${RoutesConfig.comments.create()}`}>
          <AddComment />
        </PrivateRoute>

        <PrivateRoute path={`${RoutesConfig.comments.edit}/:id`}>
          <EditComment />
        </PrivateRoute>

        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/about">
          <About />
        </PrivateRoute>

        <Route exact path="/">
          <Home />
        </Route>

        <Route component={NoMatch} />
      </Switch>
    </ApiServiceContext.Provider>
  )
}
