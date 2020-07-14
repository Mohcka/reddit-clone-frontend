import axios from 'axios'

import BaseService from './generic-service'
import { CommentModel } from '../models/comment-model'
import { VoteType } from '../models/vote-model'
import { VoteResponseDTO } from '../models/dto/votes/vote-response-dto'

export default class CommentService extends BaseService<CommentModel> {
  constructor(apiUrl: string) {
    super(apiUrl)
  }

  /** Send a request to make a vote on a specifed comment */
  VoteOnComment(id: string, voteType: VoteType): Promise<VoteResponseDTO> {
    // Send the vote type in the params because that's what the api is expecting
    // here
    return axios
      .post<VoteResponseDTO>(`${this.apiUrl}/${id}/vote`, null, {
        params: { voteType: voteType },
      })
      .then((resp) => resp.data)
  }
}
