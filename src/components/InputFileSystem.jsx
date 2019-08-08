// import Button from '@material-ui/core/Button'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    alignItems: 'baseline',
    display: 'flex'
  }
}

export class InputFileSystemComponent extends React.Component {
  static displayName = 'InputFileSystem'

  static propTypes = {
    mode: PropTypes.arrayOf(PropTypes.oneOf([
      'openDirectory',
      'openFile',
      'multiSelections'
    ])).isRequired,
    multi: PropTypes.bool
  }

  static defaultProps = {
    multi: false
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  get mode () {
    const { mode, multi } = this.props
    return multi ? [...mode, 'multiSelections'] : mode
  }

  handleBlur () {
    this.props.onBlur()
  }

  handleChange (event, value) {
    this.props.onChange(value)
  }

  handleButtonClick (event) {
    const { dialog } = require('electron').remote
    const { filters } = this.props
    const path = dialog.showOpenDialog({
      filters,
      properties: this.mode
    })
    path.then((result) => {
      if (!result.canceled) {
        const target = result.filePaths[0]
        if (target) {
          this.handleChange(event, target)
        }
      }
    })
  }

  render () {
    const { classes, multi, ...props } = this.props
    return (
      <div className={classes.container}>
        <TextField {...props} />
        <Button onClick={this.handleButtonClick}>
          Browse
        </Button>
      </div>
    )
  }
}

export const InputFileSystem = withStyles(styles)(InputFileSystemComponent)
