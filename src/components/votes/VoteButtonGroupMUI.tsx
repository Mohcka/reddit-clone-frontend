import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
// imp
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { VoteButtonGroupProps, VoteButtonGroupUIProps } from './VoteButtonGroup'
import { VoteType } from '../../models/vote-model'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upvote: {
      transform: 'rotate(-90deg)',
    },
    selectedUpvote: {
      color: theme.palette.primary.main,
    },
    downvote: {
      transform: 'rotate(90deg)',
    },
    selectedDownvote: {
      color: '#D49E20',
    },
  })
)

const VoteButtonGroupMUI: React.FC<VoteButtonGroupUIProps> = ({
  userVote,
  handleUserVote,
}) => {
  const classes = useStyles()

  const upvoteStyles = userVote === VoteType.Up ? [classes.upvote, classes.selectedUpvote] : [classes.upvote]
  const downVoteStyles = userVote === VoteType.Down ? [classes.downvote, classes.selectedDownvote] : [classes.downvote]

  return (
    <div>
      <IconButton
        onClick={() => handleUserVote(VoteType.Up)}
        className={upvoteStyles.join(' ')}
      >
        <ArrowForwardIos />
      </IconButton>
      <IconButton
        onClick={() => handleUserVote(VoteType.Down)}
        className={downVoteStyles.join(' ')}
      >
        <ArrowForwardIos />
      </IconButton>
    </div>
  )
}

export default VoteButtonGroupMUI
