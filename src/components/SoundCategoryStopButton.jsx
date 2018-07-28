import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';

import IconButton from './IconButton';

const SoundCategoryStopButton = ({ onClick, playing }) => (
  <IconButton
    disabled={!playing}
    icon={Stop}
    onClick={onClick}
  />
);

SoundCategoryStopButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundCategoryStopButton.defaultProps = {
  playing: false,
};

export default SoundCategoryStopButton;
