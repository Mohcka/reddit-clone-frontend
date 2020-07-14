import React, { useContext } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import PostForm from '../../posts/PostForm'
import { useHistory, useParams } from 'react-router'
import { ApiServiceContext } from '../../context/ApiContext'
import { ToastContext } from '../../context/toast-context'
import { CommentModel, emptyComment } from '../../../models/comment-model'
import { RoutesConfig } from '../../../config/routes-config'
import { PostContent } from '../../../models/posts/post-content'

export const AddComment = () => {
  const history = useHistory()
  const { postId } = useParams<{ postId: string }>()
  const { commentService } = useContext(ApiServiceContext)
  const toastContext = useContext(ToastContext)

  const handleSubmit = (newComment: CommentModel, submitData: PostContent) => {
    newComment = {
      ...newComment,
      userComment: submitData.content,
      postId: postId,
    }
    console.log("uhhhh")
    console.log(newComment)

    return commentService
      .create(newComment)
      .then((_data) => {
        toastContext.setIsToastOpen({
          type: 'success',
          message: 'Comment added',
          isOpen: true,
        })
        history.push(`${RoutesConfig.posts.show}/${postId}`)
      })
      .catch((_err) =>
        toastContext.setIsToastOpen({
          type: 'error',
          message: 'Something went wrong',
          isOpen: true,
        })
      )
  }

  return (
    <Container>
      <Typography variant="h4">Add a Comment...</Typography>
      <PostForm data={emptyComment} content="" handleSubmit={handleSubmit} />
    </Container>
  )
}
