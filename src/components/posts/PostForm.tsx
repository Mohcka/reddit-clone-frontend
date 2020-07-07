import React, { useState } from 'react'
import PostFormMUI from './PostFormMUI'
import { PostModel } from '../../models/post-model'

export type PostFormProps = Partial<PostModel>

/** Expect properties for the PostForm container to pass to it's UI component */
export type PostFormUIProps = Partial<PostFormProps> & {
  handleChange: (
    prop: keyof PostModel
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const PostForm: React.FC<PostFormProps> = () => {
  const [postData, setPostData] = useState<PostModel>({
    postTitle: '',
    postContent: '',
  })

  const handleSubmit = () => {
    console.log(postData)
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

  return <PostFormMUI handleChange={handleChange} handleSubmit={handleSubmit} />
}

export default PostForm
