import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import SoundCategoryItem from '../components/SoundCategoryItem';

import { getSound } from '../../sounds/selectors';
import { soundList } from '../../sounds/actions';
import { DRAG_TYPE_SOUND } from '../../sounds/constants';

const soundItem = {
  beginDrag({ sound }) {
    return sound;
  },
};

const collect = (connectDrag, monitor) => ({
  connectDragSource: connectDrag.dragSource(),
  isDragging: monitor.isDragging(),
});


const mapStateToProps = (state, { uuid }) => ({
  sound: getSound(state, uuid),
});

const mapDispatchToProps = {
  onToggle: soundList.toggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(DragSource(
  DRAG_TYPE_SOUND,
  soundItem,
  collect
)(SoundCategoryItem));
