import { connect } from 'react-redux';

import SoundBoard from '../components/SoundBoard';

import { categoryCreate, soundBoard } from '../actions';
import {
  getBoardCategoryUuids,
  isCategoryCreateFormVisible,
} from '../selectors';
import { connectSoundDropTarget } from '../../sounds/containers';

const mapStateToProps = (state, { uuid }) => ({
  categories: getBoardCategoryUuids(state, uuid),
  showCreateForm: isCategoryCreateFormVisible(state),
});

const mapDispatchToProps = {
  onAdd: categoryCreate.formShow,
  onDrop: soundBoard.soundDrop,
};

const container = connect(mapStateToProps, mapDispatchToProps)(connectSoundDropTarget(SoundBoard));

container.displayName = 'Connect(SoundBoard)';

export default container;
