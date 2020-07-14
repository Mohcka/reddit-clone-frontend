import React, { useState, useContext, useEffect } from 'react'
import PostFormMUI from './PostFormMUI'
import { PostModel, emptyPost } from '../../models/post-model'
import { ApiServiceContext } from '../context/ApiContext'
import { ApiWebService } from '../../services/generic-service'
import { useHistory } from 'react-router'
import { PostContent } from '../../models/posts/post-content'
import { PostType } from '../../models/post-type'

export type PostFormProps = {
  data: any
  title?: string
  hasTitle?: boolean
  content?: string
  /**
   * Submission method provided by the parent
   * Returns a promise so the component can act on
   * a succesful submission
   */
  handleSubmit: (postData: any, postContent: PostContent) => Promise<void>
}

/** Expect properties for the PostForm container to pass to it's UI component */
export type PostFormUIProps = Partial<PostContent> & {
  submitted: boolean
  hasTitle?: boolean
  handleChange: (
    prop: keyof PostContent
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
}

const PostForm: React.FC<PostFormProps> = ({
  data, // Data of either a Post or Comment
  title,
  content,
  hasTitle,
  handleSubmit,
}) => {
  const [dataIn, setDataIn] = useState(data)
  const [postData, setPostData] = useState({ title: '', content: '' })
  const [submitted, setSubmitted] = useState(false)

  // Update contents of fields if parent component changes them
  useEffect(() => {
    setPostData({ title: title || '', content: content || '' })
    setDataIn(data)
  }, [data, title, content])

  const _handleSubmit = () => {
    console.log(postData)

    // validate
    if ((postData.title.length === 0 && hasTitle) || postData.content.length === 0) {
      // TODO: display validation on frontend
      console.log('Please enter valid data')
      return
    }

    handleSubmit(dataIn, postData).then(() => {
      setPostData({ title: '', content: '' })
    })
  }

  /**
   * Updates the state of the input value that's being changed
   */
  const handleChange = (prop: keyof PostContent) => (
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
      hasTitle={hasTitle}
      handleChange={handleChange}
      handleSubmit={_handleSubmit}
      submitted={submitted}
    />
  )
}

export default PostForm
