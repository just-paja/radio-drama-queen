import React from 'react'

import { connect } from 'react-redux'
import { libraryLoad } from '../../soundModules/actions'
import { SoundGalleryEmpty } from '../../soundGallery/components'
import { StoryList } from '../../soundStories/components'
import { areStoriesEmpty } from '../../soundStories/selectors'
import { withStyles } from '@material-ui/core/styles'
import { workspaceLoad } from '../actions'

const styles = {
  container: {
    margin: 'auto'
  }
}

function WorkspaceEmptyComponent ({
  classes,
  onConfigOpen,
  onLibraryOpen,
  noStories
}) {
  return (
    <div className={classes.container}>
      <StoryList />
      {!noStories && (
        <SoundGalleryEmpty
          onConfigOpen={onConfigOpen}
          onLibraryOpen={onLibraryOpen}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  noStories: areStoriesEmpty(state)
})

const mapDispatchToProps = {
  onConfigOpen: workspaceLoad.dialogOpen,
  onLibraryOpen: libraryLoad.dialogShow
}

export const WorkspaceEmpty = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkspaceEmptyComponent))
