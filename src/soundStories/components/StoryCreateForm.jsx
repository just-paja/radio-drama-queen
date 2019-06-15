import Input from '../../components/Input'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { FORM_STORY_CREATE } from '../constants'
import { reduxForm, Field } from 'redux-form'
import { storyCreate } from '../actions'
import { DialogForm } from '../../components/DialogForm'

const StoryCreateFormComponent = ({
  form,
  handleSubmit,
  onClose
}) => (
  <DialogForm
    actionLabel='Create story'
    form={form}
    onClose={onClose}
    onSubmit={handleSubmit}
    title='New story'
  >
    <Field
      autoFocus
      component={Input}
      label='Story name'
      name='name'
    />
  </DialogForm>
)

StoryCreateFormComponent.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  onClose: storyCreate.close,
  onSubmit: storyCreate.submit
}

export const StoryCreateForm = connect(
  undefined,
  mapDispatchToProps
)(reduxForm({ form: FORM_STORY_CREATE })(StoryCreateFormComponent))
