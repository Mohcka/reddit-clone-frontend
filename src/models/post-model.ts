import { PostContent } from './posts/post-content'

export interface PostModel extends PostContent {
  id: string
  /** Id of the user who made this post */
  userId: string
}

export type PostsModel = Array<PostModel>
