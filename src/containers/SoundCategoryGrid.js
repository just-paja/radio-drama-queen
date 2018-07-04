import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import SoundCategoryGrid from '../components/SoundCategoryGrid';

import { categoryCreate, categoryList } from '../actions';
import { getCategoryListUuids } from '../selectors';

const mapStateToProps = state => ({
  categories: getCategoryListUuids(state),
  showCreateForm: state.categoryGrid.showCreateForm,
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

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget(
  () => [NativeTypes.FILE, NativeTypes.URL],
  boxTarget,
  (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  })
)(SoundCategoryGrid));
