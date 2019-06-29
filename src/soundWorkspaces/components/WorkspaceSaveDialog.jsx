import Input from '../../components/Input'
import React from 'react'

import { dialogForm } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_WORKSPACE_SAVE_AS } from '../constants'
import { getWorkspaceFilePath } from '../selectors'
import { workspaceLoad } from '../actions'

const WorkspaceSaveDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='File system path'
    name='path'
  />
)

export const WorkspaceSaveDialog = dialogForm({
  dialog: FORM_WORKSPACE_SAVE_AS,
  onSubmit: workspaceLoad.loadFrom,
  submitLabel: 'Save configuration',
  title: 'Save workspace configuration',
  initialValues: state => ({
    path: getWorkspaceFilePath(state)
  })
})(WorkspaceSaveDialogComponent)
