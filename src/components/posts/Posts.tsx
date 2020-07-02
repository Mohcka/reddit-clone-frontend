import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios, { AxiosResponse } from 'axios'

import Grid from '@material-ui/core/Grid'

import Post from './Post'
import { PostsModel, PostModel } from '../../models/post-model'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import PostsService from '../../services/posts-service'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
)

const PostsList: React.FC = () => {
  const postsService = new PostsService()
  const [posts, setPosts] = useState<PostModel[]>([])
  const classes = useStyles()

  useEffect(() => {
    fetchPosts()
  }, [])

  function fetchPosts(): void {
    postsService.getAll().then((resp) => setPosts(resp as PostModel[]))
  }

  return (
    <Grid container direction="column" spacing={3} className={classes.root}>
      {posts.map((post: PostModel, key) => (
        <Grid item key={key}>
          <Post {...post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostsList
