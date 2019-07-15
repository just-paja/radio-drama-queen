import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    alignItems: 'baseline',
    display: 'flex'
  }
}

export class InputDirectoryComponent extends React.Component {
  static displayName = 'InputDirectory'

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleBlur () {
    this.props.onBlur()
  }

  handleChange (event, value) {
    this.props.onChange(value)
  }

  handleButtonClick (event) {
    const { dialog } = require('electron').remote
    const path = dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (path) {
      this.handleChange(event, path[0])
    }
  }

  render () {
    const { classes, ...props } = this.props
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

export const InputDirectory = withStyles(styles)(InputDirectoryComponent)
