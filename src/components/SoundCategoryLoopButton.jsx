import PropTypes from 'prop-types';
import React from 'react';
import Loop from '@material-ui/icons/Loop';
import IconButton from '@material-ui/core/IconButton';

const SoundCategoryLoopButton = ({ onClick, loop }) => (
  <IconButton color={loop ? 'primary' : 'default'} onClick={onClick}>
    <Loop />
  </IconButton>
);

SoundCategoryLoopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loop: PropTypes.bool,
};

SoundCategoryLoopButton.defaultProps = {
  loop: false,
};

export default SoundCategoryLoopButton;
