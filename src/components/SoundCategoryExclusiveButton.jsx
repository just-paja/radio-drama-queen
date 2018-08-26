import PropTypes from 'prop-types';
import React from 'react';
import Explicit from '@material-ui/icons/Explicit';

import IconButton from './IconButton';

const SoundCategoryExclusiveButton = ({ onClick, exclusive }) => (
  <IconButton
    color={exclusive ? 'primary' : 'default'}
    icon={Explicit}
    onClick={onClick}
  />
);

SoundCategoryExclusiveButton.propTypes = {
  exclusive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

SoundCategoryExclusiveButton.defaultProps = {
  exclusive: false,
};

export default SoundCategoryExclusiveButton;
