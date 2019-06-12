import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import React from 'react'

import { Field, Form } from 'redux-form'

import CancelButton from '../../components/CancelButton'
import Input from '../../components/Input'
import OpenButton from '../../components/OpenButton'

const OpenLibraryDialog = ({
  handleSubmit,
  onClose,
  open
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='openLibraryDialogTitle'
  >
    <Form onSubmit={handleSubmit}>
      <DialogTitle id='openLibraryDialogTitle'>
        Open Library
      </DialogTitle>
      <DialogContent>
        <Field
          autoFocus
          component={Input}
          label='Library definition URL'
          name='url'
          type='url'
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <OpenButton type='submit'>
          Open
        </OpenButton>
      </DialogActions>
    </Form>
  </Dialog>
)

OpenLibraryDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

OpenLibraryDialog.defaultProps = {
  open: false
}

export default OpenLibraryDialog
