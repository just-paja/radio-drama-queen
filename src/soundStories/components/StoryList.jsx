import CanvasMessage from '../../components/CanvasMessage'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { getActiveStoryName } from '../../soundWorkspaces/selectors'
import { StoryCreateButton } from './StoryCreateButton'
import { storyRoutines } from '../actions'
import { storyStore } from '../store'

class StoryListComponent extends React.Component {
  componentDidMount () {
    this.props.onDataRequest()
  }

  renderContent () {
    const { activeStory, onStorySelect, stories } = this.props
    if (stories.length === 0) {
      return (
        <CanvasMessage heading='No recent stories'>
          <p>
            There are no stories to get back to. Perhaps this is a good time to
            create your first one and start sound story telling.
          </p>
          <StoryCreateButton />
        </CanvasMessage>
      )
    }
    return (
      <React.Fragment>
        <Typography variant='h2' gutterBottom>
          Saved stories
        </Typography>
        <List>
          {stories.map(story => (
            <ListItem
              button
              key={story.uuid}
              onClick={() => onStorySelect(story.uuid)}
              selected={story.name === activeStory}
            >
              <ListItemText>
                {story.name || story.uuid}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <StoryCreateButton />
      </React.Fragment>
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.renderContent()}
      </React.Fragment>
    )
  }
}

StoryListComponent.propTypes = {
  activeStory: PropTypes.string,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDataRequest: PropTypes.func.isRequired,
  onStorySelect: PropTypes.func.isRequired
}

StoryListComponent.defaultProps = {
  activeStory: null
}

const mapStateToProps = state => ({
  activeStory: getActiveStoryName(state),
  stories: storyStore.getAll(state)
})

const mapDispatchToProps = {
  onDataRequest: storyRoutines.list,
  onStorySelect: storyRoutines.load
}

export const StoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryListComponent)
