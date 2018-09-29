import Audiotrack from '@material-ui/icons/Audiotrack';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';
import { SoundBoard } from '../proptypes';

const styles = {
  iconSize: {
    fontSize: '0.75rem',
  },
};

const SoundBoardLabel = ({ board, classes }) => (
  <span>
    {board.playing ? (
      <span>
        <Audiotrack className={classes.iconSize} />
        {' '}
      </span>
    ) : null}
    <span>{board.name}</span>
  </span>
);

SoundBoardLabel.propTypes = {
  board: SoundBoard.isRequired,
  classes: Classes.isRequired,
};

export default withStyles(styles)(SoundBoardLabel);
