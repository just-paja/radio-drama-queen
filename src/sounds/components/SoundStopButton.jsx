import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

import { Classes } from '../../proptypes';

const styles = theme => ({
  button: {
    padding: 0,
    margin: 0,
  },
  icon: {
    height: 14,
    width: 14,
  }
});

const SoundStopButton = ({ classes, onClick, playing }) => (
  <IconButton
    className={classes.button}
    color={playing ? 'primary' : 'default'}
    disabled={!playing}
    onClick={onClick}
  >
    <Stop className={classes.icon} />
  </IconButton>
);

SoundStopButton.propTypes = {
  classes: Classes.isRequired,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundStopButton.defaultProps = {
  playing: false,
};

export default withStyles(styles)(SoundStopButton);
