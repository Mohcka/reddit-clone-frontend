export interface PostContent {
  /** Post's title */
  title: string
  /** The body of the post */
  content: string
}

export const emptyPostConent: PostContent = {
  title: '',
  content: '',
}
