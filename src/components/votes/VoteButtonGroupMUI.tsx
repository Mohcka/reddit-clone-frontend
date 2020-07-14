import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { VoteButtonGroupProps } from './VoteButtonGroup'
import { VoteType } from '../../models/vote-model'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upvote: {
      transform: 'rotate(-90deg)',
    },
    downvote: {
      transform: 'rotate(90deg)'
    }
  })
)

const VoteButtonGroupMUI: React.FC<VoteButtonGroupProps> = ({userVote, handleUserVote}) => {
  const classes = useStyles()

  

  return (
    <div>
      <IconButton onClick={() => handleUserVote(VoteType.Up)} className={`${classes.upvote} ${"oh"}`}>
        <ArrowForwardIos />
      </IconButton>
      <IconButton onClick={() => handleUserVote(VoteType.Down)} className={classes.downvote}>
        <ArrowForwardIos />
      </IconButton>
    </div>
  )
}

export default VoteButtonGroupMUI
