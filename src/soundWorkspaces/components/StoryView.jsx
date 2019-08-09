import React from 'react'

import { Center } from '../../components'
import { StoryList, StoryRenameDialog } from '../../soundStories/components'
import { StoryShortcuts } from './StoryShortcuts'

export class StoryView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleStoryFocus = this.handleStoryFocus.bind(this)
  }

  state = {
    focusedStory: null
  }

  handleStoryFocus (focusedStory) {
    this.setState({ focusedStory })
  }

  render () {
    const { focusedStory } = this.state
    return (
      <Center>
        <StoryList focusedStory={focusedStory} />
        <StoryRenameDialog />
        <StoryShortcuts
          focusedStory={focusedStory}
          onFocus={this.handleStoryFocus}
        />
      </Center>
    )
  }
}
