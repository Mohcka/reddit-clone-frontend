import React from 'react'

import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import Post from './PostMUI'
import { PostsDummyProps } from './Posts'
import { PostModel } from '../../models/post-model'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
)

const PostsMUI: React.FC<PostsDummyProps> = ({ posts }) => {
  const classes = useStyles()

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

export default PostsMUI
