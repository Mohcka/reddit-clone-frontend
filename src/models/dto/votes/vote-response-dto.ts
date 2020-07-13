export interface VoteResponseDTO {
  /**The latest vote being made to the content */
  userVote: string
  /**The current vote status of the content */
  numVotes: number
}
