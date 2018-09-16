import { connect } from 'react-redux';

import SoundCategoryItem from '../components/SoundCategoryItem';

import { getSoundSearchValueCleared } from '../../selectors';
import { getSound } from '../../sounds/selectors';
import { soundList } from '../../sounds/actions';

const mapStateToProps = (state, { uuid }) => ({
  search: getSoundSearchValueCleared(state),
  sound: getSound(state, uuid),
});

const mapDispatchToProps = {
  onToggle: soundList.toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundCategoryItem);
