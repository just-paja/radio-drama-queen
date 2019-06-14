import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { isOpenLibraryDialogOpen } from '../selectors'
import { libraryLoad } from '../actions'
import { OpenLibraryForm } from './OpenLibraryForm'

const OpenLibraryDialogComponent = ({
  onClose,
  open
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='openLibraryDialogTitle'
  >
    {open && <OpenLibraryForm />}
  </Dialog>
)

OpenLibraryDialogComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

OpenLibraryDialogComponent.defaultProps = {
  open: false
}

const mapStateToProps = state => ({
  open: isOpenLibraryDialogOpen(state)
})

const mapDispatchToProps = {
  onClose: libraryLoad.dialogHide
}

export const OpenLibraryDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenLibraryDialogComponent)
