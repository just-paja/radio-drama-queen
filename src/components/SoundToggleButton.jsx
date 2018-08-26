import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';

import IconButton from './IconButton';

const SoundToggleButton = ({
  error,
  loading,
  onClick,
  playing,
}) => {
  let IconComponent;

  if (error) {
    IconComponent = ErrorIcon;
  } else {
    IconComponent = playing ? Stop : PlayArrow;
    if (loading) {
      IconComponent = CircularProgress;
    }
  }

  return (
    <IconButton
      disabled={!!error}
      icon={IconComponent}
      onClick={onClick}
    />
  );
};

SoundToggleButton.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundToggleButton.defaultProps = {
  error: null,
  loading: false,
  playing: false,
};

export default SoundToggleButton;
