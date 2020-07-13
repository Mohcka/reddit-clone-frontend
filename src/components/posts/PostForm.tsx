import React, { useState, useContext, useEffect } from 'react'
import PostFormMUI from './PostFormMUI'
import { PostModel, emptyPost } from '../../models/post-model'
import { ApiServiceContext } from '../context/ApiContext'
import { ApiWebService } from '../../services/generic-service'
import { useHistory } from 'react-router'
import { PostContent } from '../../models/posts/post-content'

export type PostFormProps = {
  post?: PostModel
  /**
   * Submission method provided by the parent
   * Returns a promise so the component can act on
   * a succesful submission
   */
  handleSubmit: (postData: PostModel) => Promise<void>
}

/** Expect properties for the PostForm container to pass to it's UI component */
export type PostFormUIProps = Partial<PostContent> & {
  submitted: boolean
  handleChange: (
    prop: keyof PostContent
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const PostForm: React.FC<PostFormProps> = ({ post, handleSubmit }) => {
  const [postData, setPostData] = useState<PostModel>(post || emptyPost)
  const [submitted, setSubmitted] = useState(false)

  // Update contents of fields if parent component changes them
  if (post) {
    useEffect(() => {
      setPostData(post)
    }, [post])
  }

  const _handleSubmit = () => {
    console.log(postData)

    // validate
    if (postData.postContent.length === 0 || postData.postTitle.length === 0) {
      // TODO: display validation on frontend
      console.log('Please enter valid data')
      return
    }

    handleSubmit(postData).then(() => {
      setPostData({ ...postData, postContent: '', postTitle: '' })
    })
  }

  /**
   * Updates the state of the input value that's being changed
   */
  const handleChange = (prop: keyof PostModel) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e.target.value)
    // Take value being changed
    const value = e.target.value
    // Apply it to the state
    setPostData({ ...postData, [prop]: value })
  }

  return (
    <PostFormMUI
      {...postData}
      handleChange={handleChange}
      handleSubmit={_handleSubmit}
      submitted={submitted}
    />
  )
}

export default PostForm
