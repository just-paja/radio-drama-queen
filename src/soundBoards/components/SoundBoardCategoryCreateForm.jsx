import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import Input from '../../components/Input';
import CancelButton from '../../components/CancelButton';
import SaveButton from '../../components/SaveButton';

const SoundBoardCategoryCreateForm = ({ handleSubmit, onCancel }) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Field autoFocus label="Category name" name="name" component={Input} />
    </div>
    <CancelButton onClick={onCancel} />
    <SaveButton type="submit">
      Save
    </SaveButton>
  </Form>
);

SoundBoardCategoryCreateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SoundBoardCategoryCreateForm;
