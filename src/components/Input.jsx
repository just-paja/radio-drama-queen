import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import InputFeedback from './InputFeedback'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import { AppError } from './AppError'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    ':not(:first-child)': {
      marginTop: theme.spacing(1)
    }
  }
})

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
  }

  focus () {
    this.inputRef.current.focus()
  }

  render () {
    const {
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
    } = this.props
    return (
      <FormGroup className={classes.container}>
        <FormControl error={touched ? error : null}>
          <As
            {...input}
            {...props}
            error={touched ? error : null}
            label={label}
            placeholder={placeholder}
            inputRef={this.inputRef}
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
  }
}

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
