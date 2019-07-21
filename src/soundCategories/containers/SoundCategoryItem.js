import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { soundRoutines, soundStore, DRAG_TYPE_SOUND } from '../../sounds'

import SoundCategoryItem from '../components/SoundCategoryItem'

const soundItem = {
  beginDrag ({ sound }) {
    return sound
  }
}

const collect = (connectDrag, monitor) => ({
  connectDragSource: connectDrag.dragSource(),
  isDragging: monitor.isDragging()
})

const mapStateToProps = (state, { uuid }) => ({
  sound: soundStore.getObject(state, uuid)
})

const mapDispatchToProps = {
  onToggle: soundRoutines.play
}

const container = connect(mapStateToProps, mapDispatchToProps)(DragSource(
  DRAG_TYPE_SOUND,
  soundItem,
  collect
)(SoundCategoryItem))

container.displayName = 'Connect(SoundCategoryItem)'

export default container
