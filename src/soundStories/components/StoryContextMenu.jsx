import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { connect } from 'react-redux'
import { ContextMenuControl } from '../../components'
import { Children } from '../../proptypes'
import { storyRoutines } from '../actions'

class StoryContextMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
  }

  handleRemove () {
    this.props.onRemove(this.props.storyUuid)
  }

  handleRename () {
    this.props.onRename(this.props.storyUuid)
  }

  render () {
    return (
      <ContextMenuControl
        options={[
          { icon: Delete, label: 'Remove', onClick: this.handleRemove }
        ]}
      >
        {this.props.children}
      </ContextMenuControl>
    )
  }
}

StoryContextMenuComponent.propTypes = {
  children: Children.isRequired,
  storyUuid: PropTypes.string.isRequired
}

const mapStateToProps = undefined

const mapDispatchToProps = {
  onRemove: storyRoutines.remove
}

export const StoryContextMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryContextMenuComponent)
