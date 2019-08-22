import React from 'react'

import { dialogForm } from '../../dialogs'
import { DRIVER_OPTIONS, DRIVER_LOCAL, DRIVER_REMOTE, FORM_LIBRARY_OPEN } from '../constants'
import { Field, formValueSelector } from 'redux-form'
import { InputToggleButton } from '../../components'
import { libraryRoutines } from '../actions'
import { RemoteLibraryForm } from './RemoteLibraryForm'
import { LocalLibraryForm } from './LocalLibraryForm'

function renderForm (driver) {
  if (driver === DRIVER_REMOTE) {
    return <RemoteLibraryForm />
  }
  if (driver === DRIVER_LOCAL) {
    return <LocalLibraryForm />
  }
  return null
}

function OpenLibraryDialogComponent ({ driver }) {
  return (
    <>
      <Field
        component={InputToggleButton}
        name='driver'
        options={DRIVER_OPTIONS}
        exclusive
      />
      {renderForm(driver)}
    </>
  )
}

OpenLibraryDialogComponent.defaultProps = {
  driver: DRIVER_LOCAL
}

const getFormValue = formValueSelector(FORM_LIBRARY_OPEN)

function mapStateToProps (state) {
  return {
    driver: getFormValue(state, 'driver')
  }
}

export const OpenLibraryDialog = dialogForm({
  dialog: FORM_LIBRARY_OPEN,
  onSubmit: libraryRoutines.load,
  initialValues: () => ({
    driver: DRIVER_LOCAL
  }),
  mapStateToProps,
  submitLabel: 'Add Library',
  title: 'Add sound library'
})(OpenLibraryDialogComponent)
