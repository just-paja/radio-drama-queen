import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React from 'react'

import { ListItem, focusable, withContextMenu } from '../../components'
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
    const { focusableRef, selected, story, onContextMenu } = this.props
    return (
      <ListItem
        button
        ref={focusableRef}
        onClick={this.handleClick}
        onContextMenu={onContextMenu}
        selected={selected}
      >
        <ListItemText>
          {story.name || story.uuid}
        </ListItemText>
      </ListItem>
    )
  }
}

StoryListItemComponent.propTypes = {
  focusableRef: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  story: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
}

StoryListItemComponent.defaultProps = {
  selected: false
}

export const StoryListItem = withContextMenu({
  menuComponent: StoryContextMenu
})(focusable(StoryListItemComponent))
