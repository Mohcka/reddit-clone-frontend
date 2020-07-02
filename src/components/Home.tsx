import React, { Component } from "react"

import axios, { AxiosResponse } from "axios"
import { WeatherForcasts } from "../DTO/weather-forecast"

interface HomeState {
  weath: string
}

/**
 * Home page of this application
 */
export default class Home extends Component<{}, HomeState> {
  constructor(props: React.Props<{}>) {
    super(props)

    this.state = {
      weath: ""
    }
  }

  componentDidMount() {
    axios
      .get("https://localhost:5001/WeatherForecast")
      .then((resp: AxiosResponse<WeatherForcasts>) => {
        console.log(resp.data[0].summary)

        this.setState({ weath: resp.data[0].summary })
      })
  }

  render() {
    return (
      <div>
        <h2>Hello</h2>
        <p>The weather is like {this.state.weath}</p>
      </div>
    )
  }
}
