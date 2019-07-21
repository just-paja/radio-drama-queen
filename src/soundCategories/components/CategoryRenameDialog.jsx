import Input from '../../components/Input'
import React from 'react'

import { categoryRoutines } from '../actions'
import { dialogForm, getDialogMeta } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_CATEGORY_RENAME } from '../constants'
import { categoryStore } from '../store'

const CategoryRenameDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Category name'
    name='name'
  />
)

export const CategoryRenameDialog = dialogForm({
  dialog: FORM_CATEGORY_RENAME,
  initialValues: state => categoryStore.getObject(state, getDialogMeta(state, FORM_CATEGORY_RENAME)),
  onSubmit: categoryRoutines.rename,
  title: 'Rename category'
})(CategoryRenameDialogComponent)
