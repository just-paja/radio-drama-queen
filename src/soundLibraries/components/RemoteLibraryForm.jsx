import Input from '../../components/Input'
import React from 'react'

import { Field } from 'redux-form'

export const RemoteLibraryForm = () => (
  <Field
    autoFocus
    component={Input}
    label='Library definition URL'
    name='url'
    type='url'
  />
)
