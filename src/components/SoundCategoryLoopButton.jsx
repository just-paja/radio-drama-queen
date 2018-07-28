import PropTypes from 'prop-types';
import React from 'react';
import Loop from '@material-ui/icons/Loop';

import IconButton from './IconButton';

const SoundCategoryLoopButton = ({ onClick, loop }) => (
  <IconButton
    color={loop ? 'primary' : 'default'}
    icon={Loop}
    onClick={onClick}
  />
);

SoundCategoryLoopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loop: PropTypes.bool,
};

SoundCategoryLoopButton.defaultProps = {
  loop: false,
};

export default SoundCategoryLoopButton;
