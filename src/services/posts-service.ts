import axios from 'axios'
import BaseService, { ApiWebService } from './generic-service'
import { PostModel } from '../models/post-model'
import { CommentModel } from '../models/comment-model'
import { PostWithCommentsResponseDTO } from '../models/posts/post-with-comments-response-dto'
import { VoteType } from '../models/vote-model'
import { VoteResponseDTO } from '../models/dto/votes/vote-response-dto'

export interface IPostsService extends ApiWebService<PostModel> {
  getPostWithComments(id: string): Promise<PostWithCommentsResponseDTO>
}

export default class PostsService extends BaseService<PostModel>
  implements IPostsService {
  constructor(apiUrl: string) {
    super(apiUrl)
  }

  getPostWithComments(id: string): Promise<PostWithCommentsResponseDTO> {
    return axios
      .get<PostWithCommentsResponseDTO>(`${this.apiUrl}/${id}/comments`)
      .then((resp) => resp.data)
  }

  /** Send a request to make a vote on a specifed post */
  VoteOnPost(id: string, voteType: VoteType): Promise<VoteResponseDTO> {
    // Send the vote type in the params because that's what the api is expecting
    // here
    return axios
      .post<VoteResponseDTO>(`${this.apiUrl}/${id}`, null, {
        params: { voteType: voteType },
      })
      .then((resp) => resp.data)
  }
}
