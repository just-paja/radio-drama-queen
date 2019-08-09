import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { StoryRenameDialog } from './StoryRenameDialog'
import { connect } from 'react-redux'
import { ContextMenuWithOptions } from '../../components'
import { storyRoutines } from '../actions'

class StoryContextMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
  }

  handleRemove () {
    this.props.onRemove(this.props.story.uuid)
  }

  handleRename () {
    this.props.onRename(this.props.story.uuid)
  }

  render () {
    return (
      <ContextMenuWithOptions
        options={[
          {
            icon: TextFields,
            label: 'Rename',
            onClick: this.handleRename,
            shortcuts: ['r']
          },
          {
            icon: Delete,
            label: 'Delete',
            onClick: this.handleRemove,
            shortcuts: ['d', 'delete']
          }
        ]}
        {...this.props}
      />
    )
  }
}

StoryContextMenuComponent.propTypes = {
  story: PropTypes.object.isRequired
}

const mapStateToProps = undefined

const mapDispatchToProps = {
  onRemove: storyRoutines.remove,
  onRename: StoryRenameDialog.open
}

export const StoryContextMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryContextMenuComponent)
