import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';

import { withStyles } from '@material-ui/core/styles';

import { Classes, ClassName } from '../../proptypes';

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

const SoundStopButton = ({ className, classes, onClick, playing }) => (
  <IconButton
    className={classnames(classes.button, className)}
    color={playing ? 'primary' : 'default'}
    disabled={!playing}
    onClick={onClick}
  >
    <Stop className={classes.icon} />
  </IconButton>
);

SoundStopButton.propTypes = {
  className: ClassName,
  classes: Classes.isRequired,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundStopButton.defaultProps = {
  className: null,
  playing: false,
};

export default withStyles(styles)(SoundStopButton);
