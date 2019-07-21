import Input from '../../components/Input'
import React from 'react'

import { boardRoutines } from '../actions'
import { dialogForm, getDialogMeta } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_BOARD_RENAME } from '../constants'
import { boardStore } from '../store'

const BoardRenameDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Board name'
    name='name'
  />
)

export const BoardRenameDialog = dialogForm({
  dialog: FORM_BOARD_RENAME,
  initialValues: state => boardStore.getObject(state, getDialogMeta(state, FORM_BOARD_RENAME)),
  onSubmit: boardRoutines.rename,
  title: 'Rename board'
})(BoardRenameDialogComponent)
