import { connect } from 'react-redux';

import SoundCategoryControls from '../components/SoundCategoryControls';

import { categoryList } from '../actions';
import {
  getCategoryLoopStatus,
  getCategoryMutedStatus,
  getCategoryPlayingStatus,
  getCategoryVolume,
} from '../selectors';


const mapStateToProps = (state, { uuid }) => ({
  loop: getCategoryLoopStatus(state, uuid),
  muted: getCategoryMutedStatus(state, uuid),
  playing: getCategoryPlayingStatus(state, uuid),
  volume: getCategoryVolume(state, uuid),
});

const mapDispatchToProps = {
  onLoopToggle: categoryList.loopToggle,
  onStop: categoryList.stop,
  onMuteToggle: categoryList.muteToggle,
  onVolumeChange: categoryList.setVolume,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryControls);
