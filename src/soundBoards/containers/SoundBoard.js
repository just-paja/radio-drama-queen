import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import SoundBoard from '../components/SoundBoard';

import { categoryCreate } from '../actions';
import { categoryList } from '../../soundCategories/actions';
import {
  getBoardCategoryUuids,
  isCategoryCreateFormVisible,
} from '../selectors';

const mapStateToProps = (state, { uuid }) => ({
  categories: getBoardCategoryUuids(state, uuid),
  showCreateForm: isCategoryCreateFormVisible(state),
});

const mapDispatchToProps = {
  onAdd: categoryCreate.formShow,
  onDrop: categoryList.fileDrop,
};

const boxTarget = {
  drop(props, monitor, component) {
    const { onDrop } = props;
    if (component && onDrop && !monitor.didDrop() && monitor.canDrop({ shallow: true })) {
      onDrop(null, monitor);
    }
  },
};

const container = connect(mapStateToProps, mapDispatchToProps)(DropTarget(
  () => [NativeTypes.FILE, NativeTypes.URL],
  boxTarget,
  (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  })
)(SoundBoard));

container.displayName = 'Connect(SoundBoard)';

export default container;
