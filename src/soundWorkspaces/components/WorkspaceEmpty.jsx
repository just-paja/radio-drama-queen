import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getActiveStoryName, getWorkspaceView } from '../selectors'
import { NoBoards } from '../../soundBoards/components'
import { SoundGalleryEmpty } from '../../soundGallery/components'
import { soundStore } from '../../sounds'
import { StoryList } from '../../soundStories/components'
import { Story, storyStore } from '../../soundStories'
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

WorkspaceEmptyComponent.propTypes = {
  activeStory: Story,
  galleryEmpty: PropTypes.bool,
  noStories: PropTypes.bool,
  view: PropTypes.string
}

WorkspaceEmptyComponent.defaultProps = {
  galleryEmpty: false,
  noStories: false
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
