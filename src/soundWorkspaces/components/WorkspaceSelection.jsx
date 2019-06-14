import LibraryMusic from '@material-ui/icons/LibraryMusic'
import Dashboard from '@material-ui/icons/Dashboard'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { getWorkspaceView } from '../selectors'
import { withStyles } from '@material-ui/core/styles'
import { workspace } from '../actions'
import { VIEW_BOARD, VIEW_LIBRARY } from '../constants'

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

class WorkspaceSelectionComponent extends Component {
  constructor () {
    super()
    this.handleViewChange = this.handleViewChange.bind(this)
  }

  handleViewChange (event, value) {
    const { onViewSelect } = this.props
    onViewSelect(value)
  }

  render () {
    const { className, view } = this.props
    return (
      <BottomNavigation
        className={className}
        onChange={this.handleViewChange}
        value={view}
      >
        <BottomNavigationAction
          label='Boards'
          icon={<Dashboard />}
          value={VIEW_BOARD}
        />
        <BottomNavigationAction
          label='Gallery'
          icon={<LibraryMusic />}
          value={VIEW_LIBRARY}
        />
      </BottomNavigation>
    )
  }
}

WorkspaceSelectionComponent.propTypes = {
  className: PropTypes.string,
  classes: Classes.isRequired,
  onViewSelect: PropTypes.func.isRequired,
  view: PropTypes.string
}

WorkspaceSelectionComponent.defaultProps = {
  view: null
}

const mapStateToProps = state => ({
  view: getWorkspaceView(state)
})

const mapDispatchToProps = {
  onBoardSelect: workspace.selectBoard,
  onViewSelect: workspace.selectView
}

export const WorkspaceSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkspaceSelectionComponent))
