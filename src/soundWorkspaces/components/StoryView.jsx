import PropTypes from 'prop-types'
import React from 'react'

import { StoryList } from '../../soundStories/components'
import { connect } from 'react-redux'
import { Center } from '../../components'

const StoryViewComponent = ({ classes }) => (
  <Center>
    <StoryList />
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
