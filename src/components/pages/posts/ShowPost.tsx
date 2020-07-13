import React, { useContext, useState, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../../context/AuthContext'
import { ApiServiceContext } from '../../context/ApiContext'
import { PostWithCommentsResponseDTO } from '../../../models/posts/post-with-comments-response-dto'
import { useParams } from 'react-router-dom'
import Post from '../../posts/Post'

const ShowPost = () => {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useContext(AuthContext)
  const { postService } = useContext(ApiServiceContext)
  const [
    postWithComments,
    setpostWithComments,
  ] = useState<PostWithCommentsResponseDTO | null>(null)

  useEffect(() => {
    postService
      .getPostWithComments(id)
      .then((data) => setpostWithComments(data))
  }, [])

  return postWithComments ? (
    <Container>
      <Post
        title={postWithComments.post.postTitle}
        content={postWithComments.post.postContent}
        userName={postWithComments.post.userName}
      />

      <Button color="primary" variant="contained">
        Add a Comment
      </Button>

      {postWithComments.comments.length ? (
        postWithComments.comments.map((comment, key) => (
          <Post
            key={key}
            content={comment.userComment}
            userName={comment.username}
          />
        ))
      ) : (
        <Typography>No comments...</Typography>
      )}
    </Container>
  ) : (
    <div>loading...</div>
  )
}

export default ShowPost
