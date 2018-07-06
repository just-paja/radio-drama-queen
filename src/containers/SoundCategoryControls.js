import { connect } from 'react-redux';

import SoundCategoryControls from '../components/SoundCategoryControls';

import { categoryList } from '../actions';
import {
  getCategoryLoopStatus,
  getCategoryPlayingStatus,
  getCategoryVolume,
} from '../selectors';


const mapStateToProps = (state, { uuid }) => ({
  loop: getCategoryLoopStatus(state, uuid),
  playing: getCategoryPlayingStatus(state, uuid),
  volume: getCategoryVolume(state, uuid),
});

const mapDispatchToProps = {
  onLoopToggle: categoryList.loopToggle,
  onStop: categoryList.stop,
  onVolumeChange: categoryList.setVolume,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryControls);
