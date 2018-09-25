import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import SoundBoard from '../components/SoundBoard';

import { categoryCreate, soundBoard } from '../actions';
import {
  getBoardCategoryUuids,
  isCategoryCreateFormVisible,
} from '../selectors';
import { DRAG_TYPE_SOUND } from '../../soundCategories/constants';

const mapStateToProps = (state, { uuid }) => ({
  categories: getBoardCategoryUuids(state, uuid),
  showCreateForm: isCategoryCreateFormVisible(state),
});

const mapDispatchToProps = {
  onAdd: categoryCreate.formShow,
  onDrop: soundBoard.soundDrop,
};

const boxTarget = {
  drop(props, monitor, component) {
    const { onDrop, uuid } = props;
    if (component && onDrop && !monitor.didDrop() && monitor.canDrop({ shallow: true })) {
      onDrop(uuid, monitor);
    }
  },
};

const container = connect(mapStateToProps, mapDispatchToProps)(DropTarget(
  () => [NativeTypes.FILE, NativeTypes.URL, DRAG_TYPE_SOUND],
  boxTarget,
  (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  })
)(SoundBoard));

container.displayName = 'Connect(SoundBoard)';

export default container;
