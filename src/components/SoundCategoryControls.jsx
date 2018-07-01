import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SoundCategoryLoopButton from './SoundCategoryLoopButton';
import SoundCategoryStopButton from './SoundCategoryStopButton';

export default class SoundCategoryControls extends Component {
  constructor() {
    super();
    this.handleStop = this.handleStop.bind(this);
  }

  handleStop() {
    const { uuid, onStop } = this.props;
    onStop(uuid);
  }

  render() {
    const {
      loop,
      onLoopToggle,
      playing,
    } = this.props;
    return (
      <div>
        <SoundCategoryStopButton playing={playing} onClick={this.handleStop} />
        <SoundCategoryLoopButton loop={loop} onClick={onLoopToggle} />
      </div>
    );
  }
}

SoundCategoryControls.propTypes = {
  loop: PropTypes.bool,
  onLoopToggle: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  playing: PropTypes.bool,
  uuid: PropTypes.string.isRequired,
};

SoundCategoryControls.defaultProps = {
  loop: false,
  playing: false,
};
