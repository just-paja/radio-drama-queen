import PropTypes from 'prop-types';
import React from 'react';
import Loop from '@material-ui/icons/Loop';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryLoopButton = ({ onClick, playing }) => (
  <IconButton color={playing ? 'primary' : 'default'} onClick={onClick}>
    <Loop />
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
