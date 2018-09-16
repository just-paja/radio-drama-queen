import { connect } from 'react-redux';

import SoundItem from '../components/SoundItem';

import { getSound, getSoundSearchValueCleared } from '../selectors';
import { soundList } from '../actions';

const mapStateToProps = (state, { uuid }) => ({
  search: getSoundSearchValueCleared(state),
  sound: getSound(state, uuid),
});

const mapDispatchToProps = {
  onToggle: soundList.toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundItem);
