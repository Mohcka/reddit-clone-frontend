import React, { useContext, useEffect, useState } from 'react'
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
  const { postService, commentService, userService } = useContext(
    ApiServiceContext
  )
  const { isAuthenticated, userInfo } = useContext(AuthContext)
  const { setIsToastOpen } = useContext(ToastContext)

  // Passed into the vote component to display if the logged in
  // user had voted on a post before
  const [userVote, setUserVote] = useState<VoteType | undefined>(undefined)

  useEffect(() => {
    if (isAuthenticated) {
      if (postType === 'Post') {
        userService
          .getUserVoteFromPost(userInfo.userId!, postId)
          .then((data) => setUserVote(data.userVote))
      } else {
        userService
          .getUserVoteFromComment(userInfo.userId!, postId)
          .then((data) => setUserVote(data.userVote))
      }
    }
  }, [])

  // Called whenver a authenticated user clicks on a vote button
  const handleUservVote = (voteType: VoteType) => {
    // reject vote action if not authenticated
    if (!isAuthenticated) {
      setIsToastOpen({
        type: 'error',
        message: 'You must be logged in first',
        isOpen: true,
      })
      
      return Promise.reject()
    }

    if (postType === 'Post')
      return postService
        .VoteOnPost(postId, voteType)
        .then((data) => updateScore(data.numVotes))
        .catch((_err) =>
          setIsToastOpen({
            type: 'error',
            message: 'An error occured',
            isOpen: true,
          })
        )
    else
      return commentService
        .VoteOnComment(postId, voteType)
        .then((data) => updateScore(data.numVotes))
        .catch((_err) =>
          setIsToastOpen({
            type: 'error',
            message: 'An error occured',
            isOpen: true,
          })
        )
  }

  return (
    <VoteButtonGroup userVote={userVote} handleUserVote={handleUservVote} />
  )
}

export default VoteButtons
