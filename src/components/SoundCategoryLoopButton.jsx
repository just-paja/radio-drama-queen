import PropTypes from 'prop-types';
import React from 'react';
import Refresh from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryLoopButton = ({ onClick, playing }) => (
  <IconButton color={playing ? 'primary' : 'default'} onClick={onClick}>
    <Refresh />
  </IconButton>
);

SoundCategoryLoopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundCategoryLoopButton.defaultProps = {
  playing: false,
};

export default SoundCategoryLoopButton;
