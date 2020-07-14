import React, { useContext, useState } from 'react'
import PostMUI from './PostMUI'
import { PostModel } from '../../models/post-model'
import { CommentModel } from '../../models/comment-model'
import { PostType } from '../../models/post-type'

export interface PostProps {
  postType: PostType,
  postId: string,
  title?: string
  userName: string,
  /** A post's score stated by it's overall votes */
  postScore: number
  content: string
  canEdit?: boolean
  editRedirectHandler?: () => void
  showPostRedirectHandler?: () => void
  updatePostScore?: (score: number) => void
}

const Post: React.FC<PostProps> = ({
  postType,
  postId,
  title,
  postScore,
  userName,
  content,
  canEdit,
  editRedirectHandler,
  showPostRedirectHandler,
  updatePostScore
}) => {
  const [_postScore, setpostScore] = useState(postScore)

  const _editRedirectHandler = () => {
    if (editRedirectHandler) editRedirectHandler()
  }

  const _showPostRedirectHandler = () => {
    if (showPostRedirectHandler) showPostRedirectHandler()
  }

  const _updatePostScore = (score: number) => {
    setpostScore(score);
  }

  return (
    <PostMUI
      postType={postType}
      postId={postId}
      title={title}
      postScore={_postScore}
      userName={userName}
      content={content}
      canEdit={canEdit}
      editRedirectHandler={_editRedirectHandler}
      showPostRedirectHandler={_showPostRedirectHandler}
      updatePostScore={_updatePostScore}
    />
  )
}

export default Post
