import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Routes } from "./routes/Routes"
import { BrowserRouter as Router } from "react-router-dom"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export const launch = () => {
  if (document.getElementById("app"))
    ReactDOM.render(<App />, document.getElementById("app"))
}
