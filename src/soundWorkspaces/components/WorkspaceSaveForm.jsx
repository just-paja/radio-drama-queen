import Input from '../../components/Input'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { FORM_WORKSPACE_SAVE_AS } from '../constants'
import { getWorkspaceFilePath } from '../selectors'
import { reduxForm, Field } from 'redux-form'
import { workspaceSave } from '../actions'
import { DialogForm } from '../../components/DialogForm'

const WorkspaceSaveFormComponent = ({
  form,
  handleSubmit,
  onClose
}) => (
  <DialogForm
    actionLabel='Save'
    form={form}
    onClose={onClose}
    onSubmit={handleSubmit}
    title='Save workspace'
  >
    <Field
      autoFocus
      component={Input}
      label='File system path'
      name='path'
    />
  </DialogForm>
)

WorkspaceSaveFormComponent.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  initialValues: {
    path: getWorkspaceFilePath(state)
  }
})

const mapDispatchToProps = {
  onClose: workspaceSave.dialogHide,
  onSubmit: workspaceSave.saveAs
}

export const WorkspaceSaveForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: FORM_WORKSPACE_SAVE_AS })(WorkspaceSaveFormComponent))
