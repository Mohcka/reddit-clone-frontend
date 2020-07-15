import { VoteType } from "../../vote-model";

export interface VoteResponseDTO {
  /**The latest vote being made to the content */
  userVote: VoteType
  /**The current vote status of the content */
  numVotes: number
}
