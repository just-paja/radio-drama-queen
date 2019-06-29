import Input from '../../components/Input'
import React from 'react'

import { dialogForm } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_LIBRARY_OPEN } from '../constants'
import { libraryRoutines } from '../actions'

const OpenLibraryDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Library definition URL'
    name='url'
    type='url'
  />
)

export const OpenLibraryDialog = dialogForm({
  dialog: FORM_LIBRARY_OPEN,
  onSubmit: libraryRoutines.load,
  title: 'Download sound libary'
})(OpenLibraryDialogComponent)
