import React from 'react'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { PostFormUIProps } from './PostForm'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root, & .MuiButton-root': {
        margin: theme.spacing(1),
      },
    },
    contentField: {
      width: '50ch',
    },
  })
)

const PostFormMUI: React.FC<PostFormUIProps> = ({
  handleChange,
  handleSubmit,
  postTitle,
  postContent
}) => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <form noValidate autoComplete="off">
        <div>
          <TextField
            id="title-input"
            label="Title"
            placeholder="Title"
            value={postTitle}
            onChange={handleChange('postTitle')}
          />
        </div>

        <div>
          <TextField
            className={classes.contentField}
            id="content-input"
            label="Contnet"
            placeholder="Contnet"
            value={postContent}
            variant="outlined"
            onChange={handleChange('postContent')}
            multiline
          />
        </div>

        <div>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default PostFormMUI
