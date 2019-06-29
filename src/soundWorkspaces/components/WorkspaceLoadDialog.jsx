import Input from '../../components/Input'
import React from 'react'

import { dialogForm } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_WORKSPACE_LOAD_FROM } from '../constants'
import { getWorkspaceFilePath } from '../selectors'
import { workspaceLoad } from '../actions'

const WorkspaceLoadDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='File system path'
    name='path'
  />
)

export const WorkspaceLoadDialog = dialogForm({
  dialog: FORM_WORKSPACE_LOAD_FROM,
  onSubmit: workspaceLoad.loadFrom,
  submitLabel: 'Load configuration',
  title: 'Workspace configuration',
  initialValues: state => ({
    path: getWorkspaceFilePath(state)
  })
})(WorkspaceLoadDialogComponent)
