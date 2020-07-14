import { PostContent } from './posts/post-content'

export interface PostModel {
  id: string
  /** Id of the user who made this post */
  userId: string
  /** name of the user who made this post */
  userName: string
  /** The overall status of a post's votes */
  numVotes: number
  postTitle: string
  postContent: string
}

/** Used as a blank template when needed */
export const emptyPost: PostModel = {
  id: '',
  userId: '',
  userName: '',
  postContent: '',
  postTitle: '',
  numVotes: 0
}

export type PostsModel = Array<PostModel>
