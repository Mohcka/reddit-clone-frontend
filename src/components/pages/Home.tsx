import React from 'react'
import { Link } from 'react-router-dom'

import axios, { AxiosResponse } from 'axios'
import { WeatherForcasts } from '../../models/weather-forecast'
import { PostsModel } from '../../models/post-model'
import PostsList from '../posts/Posts'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      marginBottom: theme.spacing(1),
    },
  })
)

/**
 * Home page of this application
 */
const Home = () => {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h4" className={classes.title}>
        Here's some posts
      </Typography>
      <Link to="/create-post" >
        <Button variant="contained" color="primary" className={classes.button}>
          Create a new post
        </Button>
      </Link>
      <PostsList />
    </Container>
  )
}

export default Home
