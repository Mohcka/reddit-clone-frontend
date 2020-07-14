import React, { useState } from 'react'
import VoteButtonGroupMUI from './VoteButtonGroupMUI'
import { VoteType } from '../../models/vote-model'

export interface VoteButtonGroupProps {
  userVote?: VoteType
  handleUserVote: (voteType: VoteType) => void
}

export const VoteButtonGroup: React.FC<VoteButtonGroupProps> = ({
  userVote: userVoteProp,
  handleUserVote: hanleUserVoteProp,
}) => {
  const [userVote, setUserVote] = useState(null)

  const _handleUserVote = (voteType: VoteType) => {
    hanleUserVoteProp(voteType);
  }

  return <VoteButtonGroupMUI handleUserVote={_handleUserVote} />
}
