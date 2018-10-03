import PropTypes from 'prop-types';
import React from 'react';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';

import SoundCategoryIconButton from './SoundCategoryIconButton';

const VolumeToggleButton = ({ onClick, muted }) => (
  <SoundCategoryIconButton
    icon={muted ? VolumeOff : VolumeUp}
    color={muted ? 'primary' : 'default'}
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
