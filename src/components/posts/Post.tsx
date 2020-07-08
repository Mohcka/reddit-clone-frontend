import React, { useContext } from 'react'
import PostMUI from './PostMUI'
import { PostModel } from '../../models/post-model'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { RoutesConfig } from '../../config/routes-config'

export interface PostUIProps {
  post: PostModel
  canEdit: boolean,
  editRedirectHandler: () => void,
}

const Post: React.FC<PostModel> = (post) => {
  const history = useHistory();
  const {isAuthenticated, userInfo} = useContext(AuthContext)


  // A user can edit their own post
  const canEdit = post.userId === userInfo.userId && isAuthenticated

  const editRedirectHandler = () => {
    history.push(`${RoutesConfig.posts.edit}/${post.id}`)
  }


  return (
    <PostMUI post={post} canEdit={canEdit} editRedirectHandler={editRedirectHandler} />
  )
}

export default Post
