import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Routes } from './routes/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/sections/Navbar'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes />
      </Router>
    )
  }
}

export const launch = () => {
  if (document.getElementById('app'))
    ReactDOM.render(<App />, document.getElementById('app'))
}
