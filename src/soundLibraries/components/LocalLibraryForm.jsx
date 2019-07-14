import Input from '../../components/Input'
import React from 'react'

import { Field } from 'redux-form'
import { InputDirectory } from '../../components/InputDirectory'

export const LocalLibraryForm = () => (
  <Field
    autoFocus
    component={Input}
    as={InputDirectory}
    label='Library location'
    name='directory'
  />
)
