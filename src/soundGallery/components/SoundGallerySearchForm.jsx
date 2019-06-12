import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Input from '../../components/Input'

import { Classes } from '../../proptypes'

const styles = theme => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(1),
    maxWidth: theme.breakpoints.values.sm
  },
  input: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
})

class SoundSearchForm extends Component {
  constructor () {
    super()
    this.handleFilterErrorsChange = this.handleFilterErrorsChange.bind(this)
    this.handleFilterUsedChange = this.handleFilterUsedChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { onChange } = this.props
    onChange(event.target.value)
  }

  handleFilterErrorsChange (event) {
    const { onFilterErrorsChange } = this.props
    onFilterErrorsChange(event.target.checked)
  }

  handleFilterUsedChange (event) {
    const { onFilterUsedChange } = this.props
    onFilterUsedChange(event.target.checked)
  }

  render () {
    const { classes, filterErrors, filterUsed, search } = this.props
    return (
      <div className={classes.container}>
        <Input
          autoFocus
          className={classes.input}
          label='Sound search'
          input={{
            name: 'search',
            onChange: this.handleChange,
            value: search
          }}
          meta={{}}
          type='search'
        />
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.input}
              checked={filterUsed}
              name='filterUsed'
              onChange={this.handleFilterUsedChange}
            />
          )}
          label='Only unused'
        />
        <FormControlLabel
          control={(
            <Checkbox
              className={classes.input}
              checked={filterErrors}
              name='filterErrors'
              onChange={this.handleFilterErrorsChange}
            />
          )}
          label='No errors'
        />
      </div>
    )
  }
}

SoundSearchForm.propTypes = {
  classes: Classes.isRequired,
  filterErrors: PropTypes.bool,
  filterUsed: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFilterErrorsChange: PropTypes.func.isRequired,
  onFilterUsedChange: PropTypes.func.isRequired,
  search: PropTypes.string
}

SoundSearchForm.defaultProps = {
  filterErrors: false,
  filterUsed: false,
  search: ''
}

export default withStyles(styles)(SoundSearchForm)
