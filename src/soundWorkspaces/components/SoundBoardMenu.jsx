import Delete from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVert from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TextFields from '@material-ui/icons/TextFields'

import { boardRename, soundBoard } from '../../soundBoards/actions'
import { connect } from 'react-redux'

class SoundBoardMenuComponent extends Component {
  constructor () {
    super()
    this.handleAddSound = this.handleAddSound.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleRename = this.handleRename.bind(this)
    this.state = {
      menuAnchor: null
    }
  }

  handleAddSound () {
    const { onSoundPickerOpen, boardUuid } = this.props
    this.handleMenuClose()
    onSoundPickerOpen({ board: boardUuid })
  }

  handleMenuClose () {
    this.setState({ menuAnchor: null })
  }

  handleMenuOpen (event) {
    this.setState({ menuAnchor: event.currentTarget })
  }

  handleRemove () {
    const { onRemove, boardUuid } = this.props
    this.handleMenuClose()
    onRemove(boardUuid)
  }

  handleRename () {
    const { onRename, boardUuid } = this.props
    this.handleMenuClose()
    onRename(boardUuid)
  }

  render () {
    const { menuAnchor } = this.state
    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          onClose={this.handleMenuClose}
          open={Boolean(menuAnchor)}
        >
          <MenuItem onClick={this.handleRename}>
            <TextFields />
            <ListItemText primary='Rename' />
          </MenuItem>
          <MenuItem onClick={this.handleRemove}>
            <Delete />
            <ListItemText primary='Remove' />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

SoundBoardMenuComponent.propTypes = {
  boardUuid: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired
}

const mapStateToProps = undefined

const mapDispatchToProps = {
  onRename: boardRename.open,
  onRemove: soundBoard.remove
}

export const SoundBoardMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundBoardMenuComponent)
