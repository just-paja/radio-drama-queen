import { connect } from 'react-redux';

import SoundCategoryControls from '../components/SoundCategoryControls';

import { getCategoryLoopStatus, getCategoryPlayingStatus } from '../selectors';
import { categoryList } from '../actions';


const mapStateToProps = (state, { uuid }) => ({
  loop: getCategoryLoopStatus(state, uuid),
  playing: getCategoryPlayingStatus(state, uuid),
});

const mapDispatchToProps = {
  onLoopToggle: categoryList.loopToggle,
  onStop: categoryList.stop,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryControls);
