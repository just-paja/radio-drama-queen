import React from 'react'

import { storyStore } from '../../soundStories'
import { connect } from 'react-redux'
import { getActiveStoryName, getWorkspaceView } from '../selectors'
import { soundStore } from '../../sounds'
import { NoBoards } from '../../soundBoards/components'
import { SoundGalleryEmpty } from '../../soundGallery/components'
import { StoryList } from '../../soundStories/components'
import { VIEW_LIBRARY } from '../constants'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    margin: 'auto'
  }
}

function renderContent ({
  activeStory,
  galleryEmpty,
  view
}) {
  if (!activeStory) {
    return <StoryList />
  }
  if (galleryEmpty && view === VIEW_LIBRARY) {
    return <SoundGalleryEmpty />
  }
  return <NoBoards />
}

function WorkspaceEmptyComponent ({
  activeStory,
  classes,
  galleryEmpty,
  view
}) {
  return (
    <div className={classes.container}>
      {renderContent({ activeStory, galleryEmpty, view })}
    </div>
  )
}

WorkspaceEmptyComponent.displayName = 'WorkspaceEmpty'

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state),
  galleryEmpty: soundStore.isEmpty(state),
  noStories: storyStore.isEmpty(state),
  view: getWorkspaceView(state)
})

export const WorkspaceEmpty = connect(
  mapStateToProps
)(withStyles(styles)(WorkspaceEmptyComponent))
