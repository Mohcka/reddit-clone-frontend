import React, { useContext } from 'react'
import PostForm from '../posts/PostForm'
import { ApiServiceContext } from '../context/ApiContext'
import { PostModel } from '../../models/post-model'
import { useHistory } from 'react-router-dom'

const CreatePost = () => {
  const history = useHistory();
  const {postService} = useContext(ApiServiceContext)
  const emptyPost: PostModel = {
    id: '',
    userId: '',
    postContent: '',
    postTitle: ''
  }

  const handleSubmit = (postData: PostModel) => {
    return postService
      .create(postData)
      .then(() => {
        history.push('/')
      })
      .catch((err) => console.error(err))
  }

  return <PostForm post={emptyPost} handleSubmit={handleSubmit} />
}

export default CreatePost
