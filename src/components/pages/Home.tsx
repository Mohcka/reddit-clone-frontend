import React, { Component } from 'react'

import axios, { AxiosResponse } from 'axios'
import { WeatherForcasts } from '../../models/weather-forecast'
import { PostsModel } from '../../models/post-model'
import PostsList from '../posts/Posts'

import Container from '@material-ui/core/Container'

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
      weath: '',
    }
  }

  componentDidMount() {
    axios
      .get('https://localhost:5001/api/posts')
      .then((resp: AxiosResponse<PostsModel>) => {
        console.log(resp.data[0].postTitle)

        this.setState({ weath: resp.data[0].postTitle })
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
