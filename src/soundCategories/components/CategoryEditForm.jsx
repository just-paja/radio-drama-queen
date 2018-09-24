import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import Input from '../../components/Input';
import CancelButton from '../../components/CancelButton';
import SaveButton from '../../components/SaveButton';

const CategoryEditForm = ({ handleSubmit, onCancel }) => (
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

CategoryEditForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CategoryEditForm;
