import LibraryMusic from '@material-ui/icons/LibraryMusic'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import { withStyles } from '@material-ui/core/styles'

import { Classes } from '../../proptypes'
import { VIEW_LIBRARY } from '../constants'
import { SoundBoardSelection } from '../../soundBoards/containers'

const styles = {
  libraryButton: {
    marginLeft: 'auto'
  },
  viewSwitcher: {
    background: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexGrow: 1
  }
}

class WorkspaceSelection extends Component {
  constructor () {
    super()
    this.handleViewChange = this.handleViewChange.bind(this)
  }

  handleViewChange (event, value) {
    const { onViewSelect } = this.props
    onViewSelect(value)
  }

  render () {
    const {
      activeBoard,
      classes,
      onBoardSelect,
      view
    } = this.props
    return (
      <ToggleButtonGroup
        className={classes.viewSwitcher}
        exclusive
        onChange={this.handleViewChange}
        value={view}
      >
        <SoundBoardSelection
          activeBoard={activeBoard}
          onBoardSelect={onBoardSelect}
        />
        <ToggleButton
          className={classes.libraryButton}
          value={VIEW_LIBRARY}
        >
          <LibraryMusic />
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }
}

WorkspaceSelection.propTypes = {
  activeBoard: PropTypes.string,
  classes: Classes.isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  onViewSelect: PropTypes.func.isRequired,
  view: PropTypes.string
}

WorkspaceSelection.defaultProps = {
  activeBoard: null,
  view: null
}

export default withStyles(styles)(WorkspaceSelection)
