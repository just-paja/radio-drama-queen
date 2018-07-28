import PropTypes from 'prop-types';
import React from 'react';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import IconButton from '@material-ui/core/IconButton';

const VolumeToggleButton = ({ onClick, muted }) => {
  const iconStyle = { width: '12px', height: '12px', fontSize: '50%' };
  const IconComponent = muted ? VolumeOff : VolumeUp;
  return (
    <IconButton
      onClick={onClick}
      style={{ width: '24px', height: '24px', marginRight: '0.5rem' }}
    >
      <IconComponent style={iconStyle} />
    </IconButton>
  );
};

VolumeToggleButton.propTypes = {
  muted: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

VolumeToggleButton.defaultProps = {
  muted: false,
};

export default VolumeToggleButton;
