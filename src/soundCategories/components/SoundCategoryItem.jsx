import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { CategoryItemMenu } from './CategoryItemMenu'
import { Sound } from '../../sounds/proptypes'
import { SoundName, SoundStatusIcon } from '../../sounds/components'
import { SoundPlaybackInfo } from './SoundPlaybackInfo'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    alignItems: 'stretch',
    flexDirection: 'column',
    background: 'none',
    border: 'none',
    display: 'flex',
    padding: theme.spacing(1),
    userSelect: 'none',
    width: '100%',
    ...theme.components.listSeparator,

    '&:hover': {
      background: theme.palette.action.hover
    }
  },
  duration: {
    display: 'flex',
    fontSize: theme.typography.fontSize / 2,
    marginTop: theme.spacing(1 / 2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  identification: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left'
  },
  name: {
    height: theme.spacing(2),
    overflow: 'hidden',
    paddingRight: theme.spacing(1),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  icon: {
    height: theme.spacing(2),
    marginLeft: theme.spacing(1 / 2),
    marginRight: theme.spacing(1 / 2),
    width: theme.spacing(2)
  }
})

class SoundCategoryItem extends Component {
  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.props.onToggle(this.props.sound.uuid)
  }

  render () {
    const {
      categoryUuid,
      classes,
      connectDragSource,
      search,
      sound
    } = this.props
    const draggable = sound && connectDragSource && connectDragSource(
      <button
        className={classes.button}
        disabled={Boolean(sound.error)}
        onClick={this.handleToggle}
        onContextMenu={this.handleContextMenuOpen}
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
            className={classes.name}
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
    )

    return (
      <CategoryItemMenu
        categoryUuid={categoryUuid}
        soundUuid={sound.uuid}
      >
        {draggable}
      </CategoryItemMenu>
    )
  }
}

SoundCategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDragSource: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  search: PropTypes.string,
  sound: Sound.isRequired
}

SoundCategoryItem.defaultProps = {
  connectDragSource: null,
  search: ''
}

export default withStyles(styles)(SoundCategoryItem)
