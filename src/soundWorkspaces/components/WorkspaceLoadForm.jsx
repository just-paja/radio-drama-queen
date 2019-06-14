import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { DialogForm } from '../../components/DialogForm'
import { FORM_WORKSPACE_LOAD_FROM } from '../constants'
import { getWorkspaceFilePath } from '../selectors'
import { reduxForm, Field } from 'redux-form'
import { workspaceLoad } from '../actions'

import Input from '../../components/Input'

const WorkspaceLoadFormComponent = ({
  form,
  handleSubmit,
  onClose
}) => (
  <DialogForm
    actionLabel='Load configuration'
    form={form}
    onClose={onClose}
    onSubmit={handleSubmit}
    title='Workspace configuration'
  >
    <Field
      autoFocus
      component={Input}
      label='File system path'
      name='path'
    />
  </DialogForm>
)

WorkspaceLoadFormComponent.propTypes = {
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
  onClose: workspaceLoad.dialogHide,
  onSubmit: workspaceLoad.loadFrom
}

export const WorkspaceLoadForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: FORM_WORKSPACE_LOAD_FROM
})(WorkspaceLoadFormComponent))
