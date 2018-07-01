import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import Input from './Input';
import SaveButton from './SaveButton';

const CategoryEditForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Field label="Category name" name="name" component={Input} />
    </div>
    <SaveButton />
  </Form>
);

CategoryEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default CategoryEditForm;
