import PropTypes from 'prop-types';
import React from 'react';

import SoundCategoryLoopButton from './SoundCategoryLoopButton';
import SoundCategoryStopButton from './SoundCategoryStopButton';

const SoundCategoryControls = ({
  loop,
  onLoopToggle,
  onStop,
  playing,
}) => (
  <div>
    <SoundCategoryStopButton playing={playing} onClick={onStop} />
    <SoundCategoryLoopButton loop={loop} onClick={onLoopToggle} />
  </div>
);

SoundCategoryControls.propTypes = {
  loop: PropTypes.bool,
  onLoopToggle: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundCategoryControls.defaultProps = {
  loop: false,
  playing: false,
};

export default SoundCategoryControls;
