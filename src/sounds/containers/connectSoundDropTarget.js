import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { DRAG_TYPE_SOUND } from '../constants'

const boxTarget = {
  drop (props, monitor, component) {
    const { onDrop, cachePath } = props
    if (
      component &&
      onDrop &&
      !monitor.didDrop() &&
      monitor.canDrop({ shallow: true })
    ) {
      onDrop(cachePath, monitor)
    }
  }
}

export default container =>
  DropTarget(
    () => [NativeTypes.FILE, NativeTypes.URL, DRAG_TYPE_SOUND],
    boxTarget,
    (connector, monitor) => ({
      connectDropTarget: connector.dropTarget(),
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  )(container)
