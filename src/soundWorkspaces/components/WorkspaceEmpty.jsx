import React from 'react'

import { areStoriesEmpty } from '../../soundStories/selectors'
import { connect } from 'react-redux'
import { getActiveStoryName } from '../selectors'
import { libraryLoad } from '../../soundModules/actions'
import { SoundGalleryEmpty } from '../../soundGallery/components'
import { StoryList } from '../../soundStories/components'
import { withStyles } from '@material-ui/core/styles'
import { workspaceLoad } from '../actions'

const styles = {
  container: {
    margin: 'auto'
  }
}

function WorkspaceEmptyComponent ({
  activeStory,
  classes,
  onConfigOpen,
  onLibraryOpen,
  noStories
}) {
  return (
    <div className={classes.container}>
      {activeStory
        ? (
          <SoundGalleryEmpty
            onConfigOpen={onConfigOpen}
            onLibraryOpen={onLibraryOpen}
          />
        ) : <StoryList />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state),
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
