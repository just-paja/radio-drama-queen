import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const SoundToggleButton = ({ onClick, loading, playing }) => {
  const iconStyle = { width: '12px', height: '12px', fontSize: '50%' };
  let IconComponent = playing ? Stop : PlayArrow;
  if (loading) {
    IconComponent = CircularProgress;
  }
  return (
    <IconButton
      onClick={onClick}
      style={{ width: '24px', height: '24px', marginRight: '0.5rem' }}
    >
      <IconComponent style={iconStyle} />
    </IconButton>
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
