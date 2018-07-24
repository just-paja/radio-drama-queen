import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import Input from './Input';
import CancelButton from './CancelButton';
import SaveButton from './SaveButton';

const CategoryEditForm = ({ handleSubmit, onCancel }) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Field autoFocus label="Category name" name="name" component={Input} />
    </div>
    <CancelButton onClick={onCancel} />
    <SaveButton>
      Save
    </SaveButton>
  </Form>
);

CategoryEditForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CategoryEditForm;
