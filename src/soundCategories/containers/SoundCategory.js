import { connect } from 'react-redux';

import SoundCategory from '../components/SoundCategory';

import { categoryList } from '../actions';
import { connectSoundDropTarget } from '../../sounds/containers';
import { getCategoryName, getCategorySoundUuids } from '../selectors';

const mapStateToProps = (state, { uuid }) => ({
  name: getCategoryName(state, uuid),
  sounds: getCategorySoundUuids(state, uuid),
});

const mapDispatchToProps = {
  onDrop: categoryList.soundDrop,
};

const container = connect(mapStateToProps, mapDispatchToProps)(connectSoundDropTarget(SoundCategory));

container.displayName = 'Connect(SoundCategory)';

export default container;
