import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getWorkspaceFilePath, isLoadFromDialogOpen } from '../selectors'
import { workspaceLoad } from '../actions'
import { WorkspaceLoadForm } from './WorkspaceLoadForm'

const WorkspaceLoadDialogComponent = ({
  handleSubmit,
  onClose,
  open
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='workspaceDestinationDialogTitle'
  >
    {open && <WorkspaceLoadForm />}
  </Dialog>
)

WorkspaceLoadDialogComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

WorkspaceLoadDialogComponent.defaultProps = {
  open: false
}

const mapStateToProps = state => ({
  open: isLoadFromDialogOpen(state),
  initialValues: {
    path: getWorkspaceFilePath(state)
  }
})

const mapDispatchToProps = {
  onClose: workspaceLoad.dialogHide,
  onSubmit: workspaceLoad.loadFrom
}

export const WorkspaceLoadDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceLoadDialogComponent)
