import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  inline: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing(4),
    width: '100%'
  }
})

class VolumeControl extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, value) {
    const { onChange } = this.props
    onChange(value)
  }

  render () {
    const {
      classes,
      muted,
      volume
    } = this.props
    return (
      <div className={classes.inline}>
        <Slider
          max={100}
          min={0}
          onChange={this.handleChange}
          value={muted ? 0 : volume}
        />
      </div>
    )
  }
}

VolumeControl.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  muted: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired
}

VolumeControl.defaultProps = {
  muted: false
}

export default withStyles(styles)(VolumeControl)
