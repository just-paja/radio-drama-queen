import Delete from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { BoardRenameDialog } from './BoardRenameDialog'
import { boardRoutines } from '../actions'
import { connect } from 'react-redux'
import { ContextMenuControl } from '../../components'
import { Children } from '../../proptypes'

class BoardContextMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
  }

  handleRemove () {
    this.props.onRemove(this.props.boardUuid)
  }

  handleRename () {
    this.props.onRename(this.props.boardUuid)
  }

  render () {
    return (
      <ContextMenuControl
        options={[
          { icon: TextFields, label: 'Rename', onClick: this.handleRename },
          { icon: Delete, label: 'Remove', onClick: this.handleRemove }
        ]}
      >
        {this.props.children}
      </ContextMenuControl>
    )
  }
}

BoardContextMenuComponent.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  children: Children.isRequired,
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
