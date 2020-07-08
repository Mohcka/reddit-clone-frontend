import React, { useContext } from 'react'
import PostForm from '../../posts/PostForm'
import { PostModel } from '../../../models/post-model'
import { ApiServiceContext } from '../../context/ApiContext'
import { ApiWebService } from '../../../services/generic-service'

const EditPost = () => {
  const { postService } = useContext(ApiServiceContext)

  const {} = postService
  return <PostForm />
}

export default EditPost
