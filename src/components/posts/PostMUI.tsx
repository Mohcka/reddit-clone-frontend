import React from 'react'
import { PostModel } from '../../models/post-model'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
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
const PostMUI: React.FC<PostUIProps> = ({
  post,
  canEdit,
  editRedirectHandler,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <h4>{post.postTitle}</h4>
      <div>{post.postContent}</div>
      {/* Display edit button if user can edit */}
      {canEdit ? (
        <Button
          variant="contained"
          color="primary"
          onClick={editRedirectHandler}
        >
          Edit
        </Button>
      ) : null}
    </Paper>
  )
}

export default PostMUI
