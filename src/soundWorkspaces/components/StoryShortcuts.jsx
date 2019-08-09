import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getStoryUuids } from '../../soundStories'
import { isAnyDialogOpen } from '../../dialogs'
import { ListShortcuts } from '../../components'
import { getActiveStoryUuid } from '../selectors'

class StoryShortcutsComponent extends React.PureComponent {
  render () {
    const { activeStory, anyDialogOpen, focusedStory, onFocus, storyUuids } = this.props
    return (
      <ListShortcuts
        disabled={anyDialogOpen}
        focused={focusedStory}
        selected={activeStory}
        items={storyUuids}
        onFocus={onFocus}
      />
    )
  }
}

StoryShortcutsComponent.displayName = 'StoryShortcuts'
StoryShortcutsComponent.propTypes = {
  activeStory: PropTypes.string,
  anyDialogOpen: PropTypes.bool,
  onFocus: PropTypes.func.isRequired,
  storyUuids: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryUuid(state),
  anyDialogOpen: isAnyDialogOpen(state),
  storyUuids: getStoryUuids(state)
})

export const StoryShortcuts = connect(
  mapStateToProps
)(StoryShortcutsComponent)
