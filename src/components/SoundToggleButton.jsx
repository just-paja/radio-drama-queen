import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import PlayArrow from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryStopButton = ({ onClick, playing }) => (
  <IconButton
    onClick={onClick}
    iconStyle={{ width: '12px', height: '12px', fontSize: '50%' }}
    style={{ width: '24px', height: '24px', marginRight: '0.5rem' }}
    touch
  >
    {playing ? <Stop /> : <PlayArrow />}
  </IconButton>
);

SoundCategoryStopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundCategoryStopButton.defaultProps = {
  playing: false,
};

export default SoundCategoryStopButton;
