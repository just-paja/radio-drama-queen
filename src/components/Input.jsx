import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import AppError from './AppError';
import InputFeedback from './InputFeedback';

const Input = ({
  input,
  type,
  label,
  placeholder,
  meta: {
    touched,
    error,
    warning,
  },
  as: As = TextField,
  ...props
}) => (
  <FormGroup>
    <FormControl error={!!(touched && error)}>
      <As
        {...props}
        {...input}
        error={!!(touched && error)}
        label={label}
        placeholder={placeholder}
        type={type}
        value={input.value}
      />
      {touched && (
        (error || warning) ? (
          <InputFeedback type={warning ? 'warning' : 'error'}>
            <AppError error={error || warning} />
          </InputFeedback>
        ) : null
      )}
    </FormControl>
  </FormGroup>
);

Input.propTypes = {
  as: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
  }).isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    warning: PropTypes.any,
  }).isRequired,
};

Input.defaultProps = {
  as: undefined,
  label: '',
  placeholder: '',
  type: '',
};

export default Input;
