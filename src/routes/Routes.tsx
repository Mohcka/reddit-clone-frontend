import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "../components/Home"
import { About } from "../components/About"
import NoMatch from "../components/NoMatch"

// * 404
// TODO: import 404 component

export const Routes = () => {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route component={NoMatch} />
    </Switch>
  )
}
