import React, { useContext } from 'react'
import PostMUI from './PostMUI'
import { PostModel } from '../../models/post-model'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { RoutesConfig } from '../../config/routes-config'

export interface PostUIProps extends PostModel {
  canEdit: boolean,
  editRedirectHandler: () => void,
}

const Post: React.FC<PostModel> = ({postTitle, postContent, userId, id}) => {
  const history = useHistory();
  const {isAuthenticated, userInfo} = useContext(AuthContext)

  const postData = {postTitle, postContent}

  // A user can edit their own post
  const canEdit = userId === userInfo.userId && isAuthenticated

  const editRedirectHandler = () => {
    history.push(`${RoutesConfig.posts.edit}/${id}`)
  }


  return (
    <PostMUI {...postData} canEdit={canEdit} editRedirectHandler={editRedirectHandler} />
  )
}

export default Post
