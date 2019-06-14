import CancelButton from './CancelButton'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import OpenButton from './OpenButton'
import PropTypes from 'prop-types'
import React from 'react'

import { Form } from 'redux-form'

const DialogFormComponent = ({
  actionLabel,
  form,
  children,
  onClose,
  onSubmit,
  title
}) => (
  <Form onSubmit={onSubmit}>
    <DialogTitle id={form}>
      {title}
    </DialogTitle>
    <DialogContent>
      {children}
    </DialogContent>
    <DialogActions>
      <CancelButton onClick={onClose} />
      <OpenButton type='submit'>
        {actionLabel}
      </OpenButton>
    </DialogActions>
  </Form>
)

DialogFormComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export const DialogForm = DialogFormComponent
