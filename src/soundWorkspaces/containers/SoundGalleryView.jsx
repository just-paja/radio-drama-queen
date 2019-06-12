import { connect } from 'react-redux'

import SoundGalleryView from '../components/SoundGalleryView'

import { libraryLoad } from '../../soundModules/actions'
import { soundBoard } from '../../soundBoards/actions'
import {
  workspace,
  workspaceLoad,
  workspaceSound,
  workspaceTag
} from '../actions'

const mapStateToProps = undefined

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceSound.addToBoard,
  onAddTagToBoard: workspaceTag.addToBoard,
  onBoardCreate: soundBoard.create,
  onConfigOpen: workspaceLoad.dialogOpen,
  onGalleryGoBack: workspace.goBack,
  onLibraryOpen: libraryLoad.dialogShow
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundGalleryView)
