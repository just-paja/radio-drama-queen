import Input from '../../components/Input'
import React from 'react'

import { Field } from 'redux-form'
import { InputLibrary } from '../../components/InputLibrary'

export const LocalLibraryForm = () => (
  <Field
    autoFocus
    component={Input}
    as={InputLibrary}
    label='Library location'
    name='directory'
  />
)
