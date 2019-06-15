import CanvasMessage from '../../components/CanvasMessage'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { stories } from '../actions'
import { StoryCreateButton } from './StoryCreateButton'

class StoryListComponent extends React.Component {
  componentDidMount () {
    this.props.onDataRequest()
  }

  renderContent () {
    const { activeStory, stories } = this.props
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
          Recent stories
        </Typography>
        <List>
          {stories.map(story => (
            <ListItem
              button
              key={story.name}
              onClick={() => this.handleBoardChange(story.name)}
              selected={story.name === activeStory}
            >
              <ListItemText>
                {story.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
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
  stories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDataRequest: PropTypes.func.isRequired
}

StoryListComponent.defaultProps = {
  activeStory: null
}

const mapStateToProps = state => ({
  stories: []
})

const mapDispatchToProps = {
  onDataRequest: stories.trigger
}

export const StoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryListComponent)
