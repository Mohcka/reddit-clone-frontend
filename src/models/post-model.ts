export interface PostModel {
  /** Post's title */
  postTitle: string
  /** The body of the post */
  postContent: string
}

export type PostsModel = Array<PostModel>
