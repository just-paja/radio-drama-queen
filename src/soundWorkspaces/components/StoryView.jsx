import React from 'react'

import { StoryList, StoryRenameDialog } from '../../soundStories/components'
import { connect } from 'react-redux'
import { Center } from '../../components'

const StoryViewComponent = ({ classes }) => (
  <Center>
    <StoryList />
    <StoryRenameDialog />
  </Center>
)

StoryViewComponent.displayName = 'StoryView'
StoryViewComponent.propTypes = {
}

StoryViewComponent.defaultProps = {
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export const StoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryViewComponent)
