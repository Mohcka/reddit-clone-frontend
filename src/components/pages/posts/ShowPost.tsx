import React, { useContext, useState, useEffect } from 'react'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { AuthContext } from '../../context/AuthContext'
import { ApiServiceContext } from '../../context/ApiContext'
import { PostWithCommentsResponseDTO } from '../../../models/posts/post-with-comments-response-dto'
import { useParams, Link, useHistory } from 'react-router-dom'
import Post from '../../posts/Post'
import { RoutesConfig } from '../../../config/routes-config'
import { CommentModel } from '../../../models/comment-model'

const ShowPost = () => {
  const history = useHistory()
  const { id: postId } = useParams<{ id: string }>()
  const { isAuthenticated, userInfo } = useContext(AuthContext)
  const { postService } = useContext(ApiServiceContext)
  const [
    postWithComments,
    setpostWithComments,
  ] = useState<PostWithCommentsResponseDTO | null>(null)

  useEffect(() => {
    postService.getPostWithComments(postId).then((data) => {
      console.log(data)
      setpostWithComments(data)
    })
  }, [])

  const editRedirectHandler = (commentId: string) => {
    history.push(RoutesConfig.comments.edit(commentId, postId))
  }

  return postWithComments ? (
    <Container>
      <Post
        postId={postWithComments.post.id}
        postType="Post"
        postScore={postWithComments.post.numVotes}
        title={postWithComments.post.postTitle}
        content={postWithComments.post.postContent}
        userName={postWithComments.post.userName}
      />

      <Link to={`${RoutesConfig.comments.create(postWithComments.post.id)}`}>
        <Button color="primary" variant="contained">
          Add a Comment
        </Button>
      </Link>

      {postWithComments.comments.length ? (
        postWithComments.comments.map((comment, key) => (
          <Post
            key={key}
            postId={comment.id}
            postType="Comment"
            postScore={comment.numVotes}
            content={comment.userComment}
            userName={comment.username}
            canEdit={comment.userId === userInfo.userId && isAuthenticated}
            editRedirectHandler={() => editRedirectHandler(comment.id)}
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
