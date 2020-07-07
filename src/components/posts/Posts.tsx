import React, { useState, useEffect, useContext } from 'react'

import { PostModel } from '../../models/post-model'
import { ApiWebService } from '../../services/generic-service'
import { ApiServiceContext, ApiPostService } from '../context/ApiContext'
import PostsMUI from './PostsMUI'

/** Props for dummy Posts component for handling the UI */
export interface PostsDummyProps {
  posts: PostModel[]
}
/**
 * Container for a list of posts received from the server
 */
const Posts: React.FC = () => {
  const postApiService = useContext<ApiWebService<PostModel>>(ApiServiceContext)

  const [posts, setPosts] = useState<PostModel[]>([])

  useEffect(() => {
    console.log('getting posts')
    postApiService
      .getAll()
      .then((resp) => {
        setPosts(resp)
      })
      .catch((err) => {
        console.log(posts)
      })
  }, [])

  return <PostsMUI posts={posts} />
}

// TODO: make more global
export default () => (
  <ApiServiceContext.Provider value={ApiPostService}>
    <Posts />
  </ApiServiceContext.Provider>
)
