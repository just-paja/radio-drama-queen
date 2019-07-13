import Input from '../../components/Input'
import React from 'react'

import { dialogForm, getDialogMeta } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_SOUND_EDIT } from '../constants'
import { soundRoutines } from '../actions'
import { soundStore } from '../store'

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
  initialValues: state => soundStore.getFirst(state, getDialogMeta(state, FORM_SOUND_EDIT)),
  onSubmit: soundRoutines.edit,
  title: 'Edit sound'
})(SoundEditDialogComponent)
