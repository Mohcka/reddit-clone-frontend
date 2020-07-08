import React, { useContext, useState, useEffect } from 'react'
import PostForm from '../../posts/PostForm'
import { PostModel } from '../../../models/post-model'
import { ApiServiceContext } from '../../context/ApiContext'
import { ApiWebService } from '../../../services/generic-service'
import { useParams, useHistory } from 'react-router-dom'
import { RoutesConfig } from '../../../config/routes-config'
import { PostContent } from '../../../models/posts/post-content'

const EditPost = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { postService } = useContext(ApiServiceContext)
  const [post, setPost] = useState<PostModel>({
    id: '',
    userId: '',
    postTitle: '',
    postContent: '',
  })

  // Fetched post data to fill in the fields
  useEffect(() => {
    postService.get(id).then((data) => {
      console.log(data)
      setPost(data)
    })
  }, [])

  const handleSumbit = (postData: PostModel) => {
    console.log(postData)
    return postService
      .update(postData)
      .then(() => {
        history.push(RoutesConfig.home)
      })
      .catch((err) => {
        console.error(err)
        // throw error so the childcomponent doesn't
        // resolve
        throw new Error(err)
      })
  }

  return <PostForm post={post} handleSubmit={handleSumbit} />
}

export default EditPost
