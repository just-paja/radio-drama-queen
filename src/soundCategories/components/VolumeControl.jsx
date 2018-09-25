import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';

import { withStyles } from '@material-ui/core/styles';

import VolumeToggleButton from './VolumeToggleButton';

const styles = {
  inline: {
    alignItems: 'center',
    display: 'flex',
  },
};

class VolumeControl extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      classes,
      muted,
      onMuteToggle,
      volume,
    } = this.props;
    return (
      <div className={classes.inline}>
        <VolumeToggleButton muted={muted} onClick={onMuteToggle} />
        <Slider
          max={100}
          min={0}
          onChange={this.handleChange}
          value={muted ? 0 : volume}
        />
      </div>
    );
  }
}

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
