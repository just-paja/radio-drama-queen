import { connect } from 'react-redux';

import SoundCategoryControls from '../components/SoundCategoryControls';

import { categoryList } from '../actions';
import {
  getCategoryExclusiveStatus,
  getCategoryLoopStatus,
  getCategoryMutedStatus,
  getCategoryPlayingStatus,
  getCategoryVolume,
} from '../selectors';


const mapStateToProps = (state, { uuid }) => ({
  exclusive: getCategoryExclusiveStatus(state, uuid),
  loop: getCategoryLoopStatus(state, uuid),
  muted: getCategoryMutedStatus(state, uuid),
  playing: getCategoryPlayingStatus(state, uuid),
  volume: getCategoryVolume(state, uuid),
});

const mapDispatchToProps = {
  onExclusiveToggle: categoryList.exclusiveToggle,
  onLoopToggle: categoryList.loopToggle,
  onMuteToggle: categoryList.muteToggle,
  onStop: categoryList.stop,
  onVolumeChange: categoryList.setVolume,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryControls);
