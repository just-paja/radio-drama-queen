import Input from '../../components/Input'
import React from 'react'

import { storyRoutines } from '../actions'
import { dialogForm, getDialogMeta } from '../../dialogs'
import { Field } from 'redux-form'
import { FORM_STORY_RENAME } from '../constants'
import { storyStore } from '../store'
import { firstArg } from '../../components'

const StoryRenameDialogComponent = () => (
  <Field
    autoFocus
    component={Input}
    label='Story name'
    name='name'
  />
)

export const StoryRenameDialog = dialogForm({
  dialog: FORM_STORY_RENAME,
  initialValues: state => storyStore.getFirst(state, getDialogMeta(state, FORM_STORY_RENAME)),
  onSubmit: firstArg(storyRoutines.rename),
  title: 'Rename story'
})(StoryRenameDialogComponent)
