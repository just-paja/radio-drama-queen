import React from 'react'

import { connect } from 'react-redux'
import { libraryLoad } from '../../soundModules/actions'
import { SoundGalleryEmpty } from '../../soundGallery/components'
import { StoryList } from '../../soundStories/components'
import { workspaceLoad } from '../actions'

function WorkspaceEmptyComponent ({ onConfigOpen, onLibraryOpen }) {
  return (
    <React.Fragment>
      <StoryList />
      <SoundGalleryEmpty
        onConfigOpen={onConfigOpen}
        onLibraryOpen={onLibraryOpen}
      />
    </React.Fragment>
  )
}

const mapDispatchToProps = {
  onConfigOpen: workspaceLoad.dialogOpen,
  onLibraryOpen: libraryLoad.dialogShow
}

export const WorkspaceEmpty = connect(
  undefined,
  mapDispatchToProps
)(WorkspaceEmptyComponent)
