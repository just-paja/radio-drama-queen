import PropTypes from 'prop-types';
import React from 'react';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';

import IconButton from './IconButton';

const VolumeToggleButton = ({ onClick, muted }) => (
  <IconButton
    icon={muted ? VolumeOff : VolumeUp}
    onClick={onClick}
  />
);

VolumeToggleButton.propTypes = {
  muted: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

VolumeToggleButton.defaultProps = {
  muted: false,
};

export default VolumeToggleButton;
