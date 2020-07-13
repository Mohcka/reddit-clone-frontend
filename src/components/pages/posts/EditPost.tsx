import React, { useContext, useState, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import PostForm from '../../posts/PostForm'
import { PostModel, emptyPost } from '../../../models/post-model'
import { ApiServiceContext } from '../../context/ApiContext'
import { ApiWebService } from '../../../services/generic-service'
import { useParams, useHistory } from 'react-router-dom'
import { RoutesConfig } from '../../../config/routes-config'
import { PostContent } from '../../../models/posts/post-content'
import { ToastContext } from '../../context/toast-context'

const EditPost = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const { postService } = useContext(ApiServiceContext)
  const [post, setPost] = useState<PostModel>(emptyPost)

  const taostContext = useContext(ToastContext)

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
        taostContext.setIsToastOpen({
          isOpen: true,
          message: 'Edit Successful!',
          type: 'success',
        })
        history.push(RoutesConfig.home)
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

  return (
    <>
      <Container>
        <Typography variant="h4">Edit</Typography>
      </Container>
      <PostForm post={post} handleSubmit={handleSumbit} />
    </>
  )
}

export default EditPost
