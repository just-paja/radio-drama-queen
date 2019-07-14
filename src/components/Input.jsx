import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import AppError from './AppError'
import InputFeedback from './InputFeedback'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    marginTop: theme.spacing(1)
  }
})

const Input = ({
  classes,
  input,
  type,
  label,
  placeholder,
  meta: {
    touched,
    error,
    warning
  },
  as: As = TextField,
  ...props
}) => (
  <FormGroup className={classes.container}>
    <FormControl error={!!(touched && error)}>
      <As
        {...input}
        {...props}
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
)

Input.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any
  }).isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any,
    warning: PropTypes.any
  }).isRequired
}

Input.defaultProps = {
  as: undefined,
  label: '',
  placeholder: '',
  type: ''
}

export default withStyles(styles)(Input)
