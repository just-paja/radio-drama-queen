import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { stories } from '../actions'

class StoryListComponent extends React.Component {
  componentDidMount () {
    this.props.onDataRequest()
  }

  render () {
    const { activeStory, stories } = this.props
    return (
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
