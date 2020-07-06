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
  const postApiService: ApiWebService<PostModel> = useContext(
    ApiServiceContext
  ) as ApiWebService<PostModel>

  const [posts, setPosts] = useState<PostModel[]>([])

  useEffect(() => {
    postApiService.getAll().then((resp) => setPosts(resp as PostModel[]))
  }, [])

  return <PostsMUI posts={posts} />
}

// TODO: make more global
export default () => (
  <ApiServiceContext.Provider value={ApiPostService}>
    <Posts />
  </ApiServiceContext.Provider>
)
