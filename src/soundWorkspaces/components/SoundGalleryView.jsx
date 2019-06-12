import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { libraryLoad } from '../../soundModules/actions'
import { soundBoard } from '../../soundBoards/actions'
import { SoundGallery } from '../../soundGallery/containers'
import { workspace, workspaceLoad, workspaceSound, workspaceTag } from '../actions'

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceSound.addToBoard,
  onAddTagToBoard: workspaceTag.addToBoard,
  onBoardCreate: soundBoard.create,
  onConfigOpen: workspaceLoad.dialogOpen,
  onGalleryGoBack: workspace.goBack,
  onLibraryOpen: libraryLoad.dialogShow
}

const SoundGalleryViewComponent = ({
  onAddSoundToBoard,
  onAddTagToBoard,
  onBoardCreate,
  onConfigOpen,
  onGalleryGoBack,
  onLibraryOpen
}) => (
  <SoundGallery
    onAddSound={onAddSoundToBoard}
    onAddTag={onAddTagToBoard}
    onBoardCreate={onBoardCreate}
    onConfigOpen={onConfigOpen}
    onGoBack={onGalleryGoBack}
    onLibraryOpen={onLibraryOpen}
  />
)

SoundGalleryViewComponent.displayName = 'SoundGalleryView'
SoundGalleryViewComponent.propTypes = {
  onAddSoundToBoard: PropTypes.func.isRequired,
  onAddTagToBoard: PropTypes.func.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onConfigOpen: PropTypes.func.isRequired,
  onGalleryGoBack: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired
}

SoundGalleryViewComponent.defaultProps = {
  target: null
}

export const SoundGalleryView = connect(
  undefined,
  mapDispatchToProps
)(SoundGalleryViewComponent)
