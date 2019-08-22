import Input from '../../components/Input'
import React from 'react'

import { dialogForm, getDialogMeta } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_SOUND_EDIT } from '../constants'
import { InputTags } from './InputTags'
import { soundRoutines } from '../actions'
import { soundStore } from '../store'
import { tagStore } from '../../soundTags/store'

const SoundEditDialogComponent = () => (
  <>
    <Field
      autoFocus
      component={Input}
      label='Title'
      name='name'
    />
    <Field
      component={InputTags}
      label='Tags'
      name='tags'
    />
  </>
)

export const SoundEditDialog = dialogForm({
  dialog: FORM_SOUND_EDIT,
  initialValues: (state) => {
    const sound = soundStore.getObject(state, getDialogMeta(state, FORM_SOUND_EDIT))
    return sound ? {
      ...sound,
      tags: sound.tags.map(tag => tagStore.getObject(state, tag))
    } : sound
  },
  onSubmit: soundRoutines.edit,
  title: 'Edit sound'
})(SoundEditDialogComponent)
