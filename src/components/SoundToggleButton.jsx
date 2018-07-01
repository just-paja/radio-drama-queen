import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';

const SoundToggleButton = ({ onClick, playing }) => {
  const iconStyle = { width: '12px', height: '12px', fontSize: '50%' };
  const IconComponent = playing ? Stop : PlayArrow;
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
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundToggleButton.defaultProps = {
  playing: false,
};

export default SoundToggleButton;
