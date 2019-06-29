import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { BoardRenameDialog } from './BoardRenameDialog'
import { boardRoutines } from '../actions'
import { connect } from 'react-redux'
import { ContextMenuUncontrolled, ContextMenuItem } from '../../components'

class BoardContextMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleAddSound = this.handleAddSound.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
  }

  handleAddSound () {
    this.props.onSoundPickerOpen({ board: this.props.boardUuid })
  }

  handleRemove () {
    this.props.onRemove(this.props.boardUuid)
  }

  handleRename () {
    this.props.onRename(this.props.boardUuid)
  }

  render () {
    return (
      <ContextMenuUncontrolled>
        <ContextMenuItem icon={TextFields} label='Rename' onClick={this.handleRename} />
        <ContextMenuItem icon={Delete} label='Remove' onClick={this.handleRemove} />
      </ContextMenuUncontrolled>
    )
  }
}

BoardContextMenuComponent.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired
}

const mapStateToProps = undefined

const mapDispatchToProps = {
  onRename: BoardRenameDialog.open,
  onRemove: boardRoutines.remove
}

export const BoardContextMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContextMenuComponent)
