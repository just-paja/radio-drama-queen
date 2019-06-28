import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import { SoundName, SoundStatusIcon } from '../../sounds/components'
import { SoundPlaybackInfo } from './SoundPlaybackInfo'
import { Sound } from '../../sounds/proptypes'

const styles = theme => ({
  container: {
    width: '100%'
  },
  button: {
    alignItems: 'stretch',
    flexDirection: 'column',
    background: 'none',
    border: 'none',
    display: 'flex',
    padding: theme.spacing(1),
    userSelect: 'none',
    width: '100%',
    '&:hover': {
      background: theme.palette.action.hover
    }
  },
  duration: {
    display: 'flex',
    fontSize: theme.typography.fontSize * 2 / 4,
    marginTop: theme.spacing(1/4),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  identification: {
    display: 'flex',
    textAlign: 'left'
  },
  icon: {
    height: theme.typography.fontSize * 3 / 2,
    marginLeft: theme.spacing(1 / 2),
    marginRight: theme.spacing(1.5),
    width: theme.typography.fontSize * 3 / 2
  }
})

class SoundCategoryItem extends Component {
  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    const { onToggle, sound } = this.props
    onToggle(sound.uuid)
  }

  render () {
    const {
      classes,
      connectDragSource,
      search,
      sound
    } = this.props
    return sound && connectDragSource ? connectDragSource(
      <div className={classes.container}>
        <button
          className={classes.button}
          disabled={Boolean(sound.error)}
          onClick={this.handleToggle}
        >
          <span className={classes.identification}>
            <SoundStatusIcon
              className={classes.icon}
              error={sound.error}
              loading={sound.loading}
              playing={sound.playing}
              size={21}
              valid={sound.valid}
            />
            <SoundName
              name={sound.name}
              uuid={sound.uuid}
              highlight={search}
            />
          </span>
          <span className={classes.duration}>
            <SoundPlaybackInfo
              duration={sound.duration}
              playing={sound.playing}
              uuid={sound.uuid}
            />
          </span>
        </button>
      </div>
    ) : null
  }
}

SoundCategoryItem.propTypes = {
  connectDragSource: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired
}

SoundCategoryItem.defaultProps = {
  connectDragSource: null,
  search: ''
}

export default withStyles(styles)(SoundCategoryItem)
