import React from 'react'
import { PostModel } from '../../models/post-model'

import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { PostUIProps } from './Post'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
  })
)

/**
 * General component to display a Post's data
 *
 * @param post
 * @param param.postTitle
 * TODO: figure out how to docoument destructured object
 */
const PostMUI: React.FC<PostUIProps> = ({ postTitle, postContent }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <h4>{postTitle}</h4>
      <div>{postContent}</div>
    </Paper>
  )
}

export default PostMUI
