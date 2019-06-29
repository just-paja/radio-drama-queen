import PropTypes from 'prop-types'
import React from 'react'

import { boardRoutines } from '../../soundBoards'
import { connect } from 'react-redux'
import { OpenLibraryDialog } from '../../soundLibraries/components'
import { SoundGallery } from '../../soundGallery/containers'
import { workspaceRoutines, workspaceLoad, workspaceTag } from '../actions'

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

const mapDispatchToProps = {
  onAddSoundToBoard: workspaceRoutines.addSound,
  onAddTagToBoard: workspaceTag.addToBoard,
  onBoardCreate: boardRoutines.create,
  onConfigOpen: workspaceLoad.dialogOpen,
  onGalleryGoBack: workspaceRoutines.goBack,
  onLibraryOpen: OpenLibraryDialog.open
}

export const SoundGalleryView = connect(
  undefined,
  mapDispatchToProps
)(SoundGalleryViewComponent)
