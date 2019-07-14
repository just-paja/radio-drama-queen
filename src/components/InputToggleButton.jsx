import Input from './Input'
import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export class InputToggleButton extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur () {
    this.props.input.onBlur()
  }

  handleChange (event, value) {
    this.props.input.onChange(value)
  }

  render () {
    const { error, options, ...props } = this.props
    return (
      <Input
        {...props}
        as={ToggleButtonGroup}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        exclusive
      >
        {options.map(option => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </Input>
    )
  }
}
