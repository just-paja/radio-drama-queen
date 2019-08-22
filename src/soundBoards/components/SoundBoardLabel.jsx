import Audiotrack from '@material-ui/icons/Audiotrack'
import React from 'react'

import { Classes } from '../../proptypes'
import { SoundBoard } from '../proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  iconSize: {
    fontSize: '0.75rem'
  }
}

const SoundBoardLabel = ({ board, classes }) => (
  <span>
    {board.name}
    {board.playing ? (
      <>
        {' '}
        <Audiotrack className={classes.iconSize} />
      </>
    ) : null}
  </span>
)

SoundBoardLabel.propTypes = {
  board: SoundBoard.isRequired,
  classes: Classes.isRequired
}

export default withStyles(styles)(SoundBoardLabel)
