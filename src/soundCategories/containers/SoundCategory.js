import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import SoundCategory from '../components/SoundCategory';

import { categoryList } from '../actions';
import { getCategoryName, getCategorySoundUuids } from '../selectors';

const mapStateToProps = (state, { uuid }) => ({
  name: getCategoryName(state, uuid),
  sounds: getCategorySoundUuids(state, uuid),
});

const mapDispatchToProps = {
  onDrop: categoryList.fileDrop,
};

const boxTarget = {
  drop(props, monitor, component) {
    const { onDrop, uuid } = props;
    if (component && onDrop && !monitor.didDrop() && monitor.canDrop({ shalow: true })) {
      onDrop(uuid, monitor);
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
)(SoundCategory));
