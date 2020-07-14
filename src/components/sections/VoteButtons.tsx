import React, { useContext } from 'react'
import { VoteButtonGroup } from '../votes/VoteButtonGroup'
import { ApiServiceContext } from '../context/ApiContext'
import { VoteType } from '../../models/vote-model'
import { PostType } from '../../models/post-type'
import { ToastContext } from '../context/toast-context'
import { AuthContext } from '../context/AuthContext'

export interface VoteButtonsProps {
  postId: string
  postType: PostType
  updateScore: (score: number) => void
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  postId,
  postType,
  updateScore,
}) => {
  const apiContext = useContext(ApiServiceContext)
  const { isAuthenticated } = useContext(AuthContext)
  const { setIsToastOpen } = useContext(ToastContext)

  // Called whenver a authenticated user clicks on a vote button
  const handleUservVote = (voteType: VoteType) => {
    if (!isAuthenticated)
      return setIsToastOpen({
        type: 'error',
        message: 'You must be logged in first',
        isOpen: true,
      })

    if ((postType === 'Post'))
      apiContext.postService
        .VoteOnPost(postId, voteType)
        .then(data => updateScore(data.numVotes))
        .catch((_err) =>
          setIsToastOpen({
            type: 'error',
            message: 'An error occured',
            isOpen: true,
          })
        )

    if ((postType === 'Comment'))
      apiContext.commentService
        .VoteOnComment(postId, voteType)
        .then(data => updateScore(data.numVotes))
        .catch((_err) =>
          setIsToastOpen({
            type: 'error',
            message: 'An error occured',
            isOpen: true,
          })
        )
  }

  return <VoteButtonGroup handleUserVote={handleUservVote} />
}

export default VoteButtons
