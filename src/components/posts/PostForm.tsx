import React, { useState } from 'react'
import PostFormMUI from './PostFormMUI'
import { PostModel } from '../../models/post-model'
import { useHistory } from 'react-router'

export type PostFormProps = Partial<PostModel>

/** Expect properties for the PostForm container to pass to it's UI component */
export type PostFormUIProps = Partial<PostFormProps> & {
  submitted: boolean
  handleChange: (
    prop: keyof PostModel
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const PostForm: React.FC<PostFormProps> = () => {
  const [postData, setPostData] = useState<PostModel>({
    postTitle: '',
    postContent: '',
    submitted: false,
  })

  const handleSubmit = () => {
    console.log(postData)

    // validate
    if (postData.postContent.length === 0 || postData.postTitle.length === 0) {
      console.log('Please enter valid data')
      return
    }

    postApiService
      .create(postData)
      .then(() => {
        setPostData({ ...postData, postContent: '', postTitle: '' })
        history.push('/')
      })
      .catch((err) => console.error(err))
  }

  /**
   * Updates the state of the input value that's being changed
   */
  const handleChange = (prop: keyof PostModel) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Take value being changed
    const value = e.target.value
    // Apply it to the state
    setPostData({ ...postData, [prop]: value })
  }

  return (
    <PostFormMUI
      {...postData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      submitted={postData.submitted}
    />
  )
}

export default PostForm
