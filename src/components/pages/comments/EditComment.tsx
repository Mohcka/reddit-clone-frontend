import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { ApiServiceContext } from '../../context/ApiContext'
import { ToastContext } from '../../context/toast-context'
import { CommentModel, emptyComment } from '../../../models/comment-model'
import { PostContent } from '../../../models/posts/post-content'
import { RoutesConfig } from '../../../config/routes-config'
import PostForm from '../../posts/PostForm'

const EditComment = () => {
  const history = useHistory()
  const { id, postId } = useParams<{ id: string; postId: string }>()
  const { commentService } = useContext(ApiServiceContext)
  const [comment, setComment] = useState<CommentModel>(emptyComment)
  const taostContext = useContext(ToastContext)

  useEffect(() => {
    commentService.get(id).then((data) => {
      setComment(data)
    })
  }, [])

  const handleSubmit = (oldComment: CommentModel, subtmiData: PostContent) => {
    const updatedComment: CommentModel = {
      ...oldComment,
      userComment: subtmiData.content,
    }

    return commentService
      .update(updatedComment)
      .then(() => {
        taostContext.setIsToastOpen({
          isOpen: true,
          type: 'success',
          message: 'Edit Success',
        })
        history.push(`${RoutesConfig.posts.show}/${postId}`)
      })
      .catch(() => {
        taostContext.setIsToastOpen({
          isOpen: true,
          type: 'error',
          message: 'An Error Has Occured',
        })
      })
  }

  return (
    <Container>
      <Typography variant="h4">Make an Edit</Typography>
      <PostForm
        data={comment}
        content={comment.userComment}
        handleSubmit={handleSubmit}
      />
    </Container>
  )
}

export default EditComment
