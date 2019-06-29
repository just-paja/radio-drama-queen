import Input from '../../components/Input'
import React from 'react'

import { dialogForm } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_STORY_CREATE } from '../constants'
import { storyRoutines } from '../actions'

const StoryCreateFormComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Story name'
    name='name'
  />
)

export const StoryCreateDialog = dialogForm({
  dialog: FORM_STORY_CREATE,
  onSubmit: storyRoutines.create,
  title: 'Create story'
})(StoryCreateFormComponent)
