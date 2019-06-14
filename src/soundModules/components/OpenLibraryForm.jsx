import Input from '../../components/Input'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { FORM_LIBRARY_OPEN } from '../constants'
import { libraryLoad } from '../actions'
import { DialogForm } from '../../components/DialogForm'
import { reduxForm, Field } from 'redux-form'

const OpenLibraryFormComponent = ({
  form,
  handleSubmit,
  onClose
}) => (
  <DialogForm
    actionLabel='Open'
    form={form}
    onClose={onClose}
    onSubmit={handleSubmit}
    title='Open Library'
  >
    <Field
      autoFocus
      component={Input}
      label='Library definition URL'
      name='url'
      type='url'
    />
  </DialogForm>
)

OpenLibraryFormComponent.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

OpenLibraryFormComponent.defaultProps = {
  open: false
}

const mapDispatchToProps = {
  onClose: libraryLoad.dialogHide,
  onSubmit: libraryLoad.submit
}

export const OpenLibraryForm = connect(
  undefined,
  mapDispatchToProps
)(reduxForm({ form: FORM_LIBRARY_OPEN })(OpenLibraryFormComponent))
