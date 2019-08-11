import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Dashboard from '@material-ui/icons/Dashboard'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import LibraryMusic from '@material-ui/icons/LibraryMusic'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Classes } from '../../proptypes'
import { Story } from '../../soundStories'
import { connect } from 'react-redux'
import { getActiveStory, getWorkspaceView } from '../selectors'
import { withStyles } from '@material-ui/core/styles'
import { workspaceRoutines } from '../actions'
import {
  VIEW_BOARD,
  VIEW_LIBRARY,
  VIEW_STORIES
} from '../constants'

const styles = theme => ({
  group: {
    background: 'transparent'
  },
  button: {
    color: 'rgba(255,255,255,.33)',
    cursor: 'default',
    height: theme.spacing(4.5)
  },
  selected: {
    '&.MuiToggleButton-root': {
      color: theme.palette.infoData.selected
    }
  },
  disabled: {
    '&.MuiToggleButton-root': {
      color: theme.palette.infoData.forbidden
    }
  },
  icon: {
    fontSize: theme.spacing(2.5)
  }
})

function renderButton (classes, Icon, title, value, disabled) {
  return (
    <ToggleButton
      classes={{
        disabled: classes.disabled,
        root: classes.button,
        selected: classes.selected
      }}
      disabled={disabled}
      title={title}
      value={value}
    >
      <Icon className={classes.icon} />
    </ToggleButton>
  )
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
    const { activeStory, classes, view } = this.props
    return (
      <ToggleButtonGroup
        className={classes.group}
        onChange={this.handleViewChange}
        exclusive
        value={view}
      >
        {renderButton(classes, LibraryBooks, 'Stories', VIEW_STORIES)}
        {renderButton(classes, LibraryMusic, 'Gallery', VIEW_LIBRARY, !activeStory)}
        {renderButton(classes, Dashboard, 'Boards', VIEW_BOARD, !activeStory)}
      </ToggleButtonGroup>
    )
  }
}

WorkspaceSelectionComponent.propTypes = {
  activeStory: Story,
  className: PropTypes.string,
  classes: Classes.isRequired,
  onViewSelect: PropTypes.func.isRequired,
  view: PropTypes.string
}

WorkspaceSelectionComponent.defaultProps = {
  activeStory: null,
  view: null
}

const mapStateToProps = state => ({
  activeStory: getActiveStory(state),
  view: getWorkspaceView(state)
})

const mapDispatchToProps = {
  onBoardSelect: workspaceRoutines.selectBoard,
  onViewSelect: workspaceRoutines.selectView
}

export const WorkspaceSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkspaceSelectionComponent))
