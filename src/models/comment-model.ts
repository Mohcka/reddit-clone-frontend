export interface CommentModel {
  id: string,
  userComment: string
  userId: string
  username: string
  postId: string
  numVotes: number
}

export const emptyComment: CommentModel = {
  id: 'string',
  userComment: 'string',
  userId: 'string',
  username: 'string',
  postId: 'string',
  numVotes: 0
}
