import React, { useContext } from 'react'
import PostMUI from './PostMUI'
import { PostModel } from '../../models/post-model'
import { AuthContext } from '../context/AuthContext'

export interface PostUIProps extends PostModel {
  canEdit: boolean,
  editRedirectHandler: () => void,
}

const Post: React.FC<PostModel> = ({postTitle, postContent}) => {
  const {isAuthenticated, userInfo} = useContext(AuthContext)

  const postData = {postTitle, postContent}


  return (
    <PostMUI {...postData} canEdit={false} editRedirectHandler={() => {}} />
  )
}

export default Post
