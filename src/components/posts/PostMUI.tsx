import React from 'react'
import { PostModel } from '../../models/post-model'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { PostProps } from './Post'
import VoteButtons from '../sections/VoteButtons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
    },
    title: {
      cursor: 'pointer',
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
const PostMUI: React.FC<PostProps> = ({
  postType,
  postId,
  title,
  postScore,
  userName,
  content,
  canEdit,
  editRedirectHandler,
  showPostRedirectHandler,
  updatePostScore,
}) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <div>
        <VoteButtons
          postId={postId}
          postType={postType}
          updateScore={updatePostScore!}
        />
      </div>
      <div>
        {title ? (
          <Typography
            onClick={showPostRedirectHandler}
            variant="h6"
            className={classes.title}
          >
            {title}
          </Typography>
        ) : null}

        <Typography>By {userName}</Typography>
        <Typography>Score: {postScore}</Typography>

        <Typography>{content}</Typography>

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
      </div>
    </Paper>
  )
}

export default PostMUI
