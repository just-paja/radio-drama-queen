import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from './IconButton';

const SoundToggleButton = ({ onClick, loading, playing }) => {
  let IconComponent = playing ? Stop : PlayArrow;
  if (loading) {
    IconComponent = CircularProgress;
  }
  return (
    <IconButton
      onClick={onClick}
      icon={IconComponent}
    />
  );
};

SoundToggleButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundToggleButton.defaultProps = {
  loading: false,
  playing: false,
};

export default SoundToggleButton;
