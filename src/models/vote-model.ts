export enum VoteType {
  Up = "Up",
  Down = "Down"
}

export interface VoteModel {
  id: string;
  userVote: VoteType;
  userId: string;
  responseId: string;
}