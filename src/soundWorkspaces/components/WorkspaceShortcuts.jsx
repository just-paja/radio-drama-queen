import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import React from 'react'

import { connect } from 'react-redux'
import { getActiveStory, getFocusedCategory, getWorkspaceView } from '../selectors'
import { isAnyDialogOpen } from '../../dialogs'
import { Story } from '../../soundStories'
import { VIEW_CYCLE } from '../constants'
import { workspaceRoutines } from '../actions'

class WorkspaceShortcutsComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleMoveLeft = this.handleMoveLeft.bind(this)
    this.handleMoveRight = this.handleMoveRight.bind(this)
  }

  get viewIndex () {
    return VIEW_CYCLE.indexOf(this.props.view)
  }

  handleMoveLeft () {
    if (this.viewIndex > 0 && this.props.activeStory) {
      this.selectViewByIndex(this.viewIndex - 1)
    }
  }

  handleMoveRight () {
    if (this.viewIndex < VIEW_CYCLE.length - 1 && this.props.activeStory) {
      this.selectViewByIndex(this.viewIndex + 1)
    }
  }

  selectViewByIndex (index) {
    if (VIEW_CYCLE[index]) {
      this.props.onViewSelect(VIEW_CYCLE[index])
    }
  }

  render () {
    const { openDialogs } = this.props
    if (openDialogs) {
      return null
    }
    return (
      <>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['ctrl+left']}
          onKeyEvent={this.handleMoveLeft}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['ctrl+right']}
          onKeyEvent={this.handleMoveRight}
        />
      </>
    )
  }
}

WorkspaceShortcutsComponent.displayName = 'WorkspaceView'

WorkspaceShortcutsComponent.propTypes = {
  activeStory: Story,
  openDialogs: PropTypes.bool,
  view: PropTypes.string
}

WorkspaceShortcutsComponent.defaultProps = {
  activeStory: null,
  openDialogs: false,
  view: null
}

const mapStateToProps = state => ({
  activeStory: getActiveStory(state),
  focusedCategory: getFocusedCategory(state),
  openDialogs: isAnyDialogOpen(state),
  view: getWorkspaceView(state)
})

const mapDispatchToProps = {
  onViewSelect: workspaceRoutines.selectView
}

export const WorkspaceShortcuts = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceShortcutsComponent)
