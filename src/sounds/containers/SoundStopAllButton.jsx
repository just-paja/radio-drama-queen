import { connect } from 'react-redux';

import SoundStopButton from '../components/SoundStopButton';

import { soundList } from '../actions';
import { isAnySoundPlaying } from '../selectors';

const mapStateToProps = state => ({
  playing: isAnySoundPlaying(state),
});

const mapDispatchToProps = {
  onClick: soundList.stopAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundStopButton);
