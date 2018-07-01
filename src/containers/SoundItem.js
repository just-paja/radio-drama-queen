import { connect } from 'react-redux';

import SoundItem from '../components/SoundItem';

import { getSound } from '../selectors';
import { soundList } from '../actions';

const mapStateToProps = (state, { uuid }) => ({
  sound: getSound(state, uuid),
});

const mapDispatchToProps = {
  onToggle: soundList.toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundItem);
