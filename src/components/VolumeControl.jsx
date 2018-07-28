import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Slider } from 'material-ui-slider';

import VolumeToggleButton from './VolumeToggleButton';

const styles = {
  inline: {
    alignItems: 'center',
    display: 'flex',
  },
};

const VolumeControl = ({
  classes,
  muted,
  onChange,
  onMuteToggle,
  volume,
}) => (
  <div className={classes.inline}>
    <VolumeToggleButton muted={muted} onClick={onMuteToggle} />
    <Slider
      max={100}
      min={0}
      onChange={onChange}
      value={muted ? 0 : volume}
    />
  </div>

);

VolumeControl.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  muted: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onMuteToggle: PropTypes.func.isRequired,
  volume: PropTypes.number,
};

VolumeControl.defaultProps = {
  muted: false,
  volume: null,
};

export default withStyles(styles)(VolumeControl);
