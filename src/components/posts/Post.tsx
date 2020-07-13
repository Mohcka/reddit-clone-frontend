import React, { useContext } from 'react'
import PostMUI from './PostMUI'
import { PostModel } from '../../models/post-model'
import { CommentModel } from '../../models/comment-model'
import { PostType } from '../../models/post-type'

export interface PostProps {
  postType: PostType,
  title?: string
  userName: string
  content: string
  canEdit?: boolean
  editRedirectHandler?: () => void
  showPostRedirectHandler?: () => void
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  userName,
  canEdit,
  postType,
  editRedirectHandler,
  showPostRedirectHandler,
}) => {
  const _editRedirectHandler = () => {
    if (editRedirectHandler) editRedirectHandler()
  }

  const _showPostRedirectHandler = () => {
    if (showPostRedirectHandler) showPostRedirectHandler()
  }

  return (
    <PostMUI
      postType={postType}
      title={title}
      content={content}
      userName={userName}
      canEdit={canEdit}
      editRedirectHandler={_editRedirectHandler}
      showPostRedirectHandler={_showPostRedirectHandler}
    />
  )
}

export default Post
