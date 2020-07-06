import React, { Component } from 'react'

import axios, { AxiosResponse } from 'axios'
import { WeatherForcasts } from '../../models/weather-forecast'
import { PostsModel } from '../../models/post-model'
import PostsList from '../posts/Posts'

import Container from '@material-ui/core/Container'

/**
 * Home page of this application
 */
export default class Home extends Component {
  constructor(props: React.Props<{}>) {
    super(props)
  }

  componentDidMount() {
    axios
      .get('https://localhost:5001/api/posts')
      .then((resp: AxiosResponse<PostsModel>) => {
      })
  }

  render() {
    return (
      <div>
        <Container>
          <h2>Here's some posts</h2>
          <PostsList />
        </Container>
      </div>
    )
  }
}
