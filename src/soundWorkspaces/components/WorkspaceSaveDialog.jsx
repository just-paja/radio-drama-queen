import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { isSaveAsDialogOpen } from '../selectors'
import { workspaceSave } from '../actions'
import { WorkspaceSaveForm } from './WorkspaceSaveForm'

const WorkspaceSaveDialogComponent = ({
  handleSubmit,
  onClose,
  open
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='workspaceDestinationDialogTitle'
  >
    {open && <WorkspaceSaveForm />}
  </Dialog>
)

WorkspaceSaveDialogComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

WorkspaceSaveDialogComponent.defaultProps = {
  open: false
}

const mapStateToProps = state => ({
  open: isSaveAsDialogOpen(state)
})

const mapDispatchToProps = {
  onClose: workspaceSave.dialogHide
}

export const WorkspaceSaveDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspaceSaveDialogComponent)
