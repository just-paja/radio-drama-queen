import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'

import { StoryContextMenu } from './StoryContextMenu'

class StoryListItemComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.story.uuid)
  }

  render () {
    const { selected, story } = this.props
    return (
      <StoryContextMenu storyUuid={story.uuid}>
        <ListItem
          button
          onClick={this.handleClick}
          selected={selected}
        >
          <ListItemText>
            {story.name || story.uuid}
          </ListItemText>
        </ListItem>
      </StoryContextMenu>
    )
  }
}

StoryListItemComponent.propTypes = {
  selected: PropTypes.bool,
  story: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

StoryListItemComponent.defaultProps = {
  selected: false
}

export const StoryListItem = StoryListItemComponent
