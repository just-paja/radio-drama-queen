import { connect } from 'react-redux'

import SoundBoardSpeedDial from '../components/SoundBoardSpeedDial'

import {
  boardRename,
  categoryCreate,
  soundBoard
} from '../actions'

const mapStateToProps = undefined

const mapDispatchToProps = {
  onCategoryCreate: categoryCreate.formShow,
  onBoardCreate: soundBoard.create,
  onBoardRename: boardRename.open
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundBoardSpeedDial)
