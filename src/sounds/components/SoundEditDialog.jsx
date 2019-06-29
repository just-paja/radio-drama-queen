import Input from '../../components/Input'
import React from 'react'

import { dialogForm } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_SOUND_EDIT } from '../constants'

const SoundEditDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Title'
    name='name'
  />
)

export const SoundEditDialog = dialogForm({
  dialog: FORM_SOUND_EDIT,
  title: 'Edit sound'
})(SoundEditDialogComponent)
