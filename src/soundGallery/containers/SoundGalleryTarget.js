import { connect } from 'react-redux';

import SoundGalleryTarget from '../components/SoundGalleryTarget';

import { getBoard } from '../../soundBoards/selectors';
import { getCategory } from '../../soundCategories/selectors';

const mapStateToProps = (state, { board, category }) => ({
  board: getBoard(state, board),
  category: getCategory(state, category),
});

const container = connect(mapStateToProps)(SoundGalleryTarget);

container.displayName = 'Connect(SoundGalleryTarget)';

export default container;
