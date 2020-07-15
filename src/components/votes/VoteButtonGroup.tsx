import React, { useState, useEffect } from 'react'
import VoteButtonGroupMUI from './VoteButtonGroupMUI'
import { VoteType } from '../../models/vote-model'
import { usePrevious } from '../../utils/react-helpers'

export interface VoteButtonGroupProps {
  userVote?: VoteType
  handleUserVote: (voteType: VoteType) => Promise<void>
}

export interface VoteButtonGroupUIProps {
  userVote?: VoteType
  handleUserVote: (voteType: VoteType) => void
}

export const VoteButtonGroup: React.FC<VoteButtonGroupProps> = ({
  userVote: userVoteProp,
  handleUserVote: hanleUserVoteProp,
}) => {
  const [userVote, setUserVote] = useState(userVoteProp)
  const prevUserVote = usePrevious(userVote)

  // update vote when fetched from the server
  useEffect(() => {
    setUserVote(userVoteProp)
  }, [userVoteProp])

  const _handleUserVote = (voteType: VoteType) => {
    // On a succesful vote, update the state to reflect on the UI
    hanleUserVoteProp(voteType).then(() => {
      // negate vote if the same vote was selected
      console.log(`Prev: ${prevUserVote} curr: ${voteType}`)
      if (prevUserVote === voteType) setUserVote(undefined)
      else setUserVote(voteType)
    })
  }

  return (
    <VoteButtonGroupMUI handleUserVote={_handleUserVote} userVote={userVote} />
  )
}
