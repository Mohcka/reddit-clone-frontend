import React, { useContext } from 'react'
import PostForm from '../posts/PostForm'
import { ApiServiceContext } from '../context/ApiContext'
import { PostModel } from '../../models/post-model'
import { useHistory } from 'react-router-dom'
import { ToastContext } from '../context/toast-context'

const CreatePost = () => {
  const history = useHistory()
  const { postService } = useContext(ApiServiceContext)
  const taostContext = useContext(ToastContext)

  const handleSubmit = (postData: PostModel) => {
    return postService
      .create(postData)
      .then(() => {
        taostContext.setIsToastOpen({
          isOpen: true,
          message: 'Post Created!',
          type: 'success',
        })
        history.push('/')
      })
      .catch((err) => {
        taostContext.setIsToastOpen({
          isOpen: true,
          message: 'An Error Occured',
          type: 'error',
        })
        // throw error so the childcomponent doesn't
        // resolve
        throw new Error(err)
      })
  }

  return <PostForm handleSubmit={handleSubmit} />
}

export default CreatePost
