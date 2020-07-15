import Axios from 'axios'
import { VoteResponseDTO } from '../models/dto/votes/vote-response-dto'

export default class UsersService {
  constructor(private apiUrl: string) {}

  getUserVoteFromPost(
    userId: string,
    postid: string
  ): Promise<VoteResponseDTO> {
    return Axios.get<VoteResponseDTO>(
      `${this.apiUrl}/${userId}/posts/${postid}/votes`
    ).then((resp) => resp.data)
  }
  
  getUserVoteFromComment(
    userId: string,
    commentid: string
  ): Promise<VoteResponseDTO> {
    return Axios.get<VoteResponseDTO>(
      `${this.apiUrl}/${userId}/comments/${commentid}/votes`
    ).then((resp) => resp.data)
  }
}
