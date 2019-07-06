import AddCircle from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { gallerySound } from '../actions'
import { GallerySound } from '../proptypes'
import { getGalleryTarget } from '../selectors'
import { SoundStatusIcon } from '../../sounds/components'
import { SoundTags } from './SoundTags'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  controls: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    marginRight: theme.spacing(1)
  },
  item: {
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    marginLeft: -1 * theme.spacing(1),
    marginRight: -1 * theme.spacing(1),
    userSelect: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.1)'
    }
  }
})

class GalleryItemComponent extends Component {
  constructor () {
    super()
    this.handlePlayClick = this.handlePlayClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleTagAdd = this.handleTagAdd.bind(this)
  }

  handleAdd () {
    const { onAdd, sound: { uuid }, target: { board, category } } = this.props
    onAdd({ board, category, sound: uuid })
  }

  handleTagAdd (tag) {
    const { onAddTag, target } = this.props
    onAddTag(tag, { target })
  }

  handlePlayClick () {
    const { onPlay, sound: { uuid } } = this.props
    onPlay(uuid)
  }

  render () {
    const { classes, sound } = this.props
    return (
      <div className={classes.item}>
        <div className={classes.controls}>
          <IconButton disabled={sound.isUsed || sound.error} onClick={this.handleAdd}>
            <AddCircle />
          </IconButton>
          <IconButton onClick={this.handlePlayClick}>
            <SoundStatusIcon
              error={sound.error}
              loading={sound.loading}
              playing={sound.playing}
              size={22}
              valid
            />
          </IconButton>
        </div>
        <div>
          <span>{sound.name}</span>
          <SoundTags onTagClick={this.handleTagAdd} tags={sound.tags} />
        </div>
      </div>
    )
  }
}

GalleryItemComponent.displayName = 'GalleryItem'
GalleryItemComponent.propTypes = {
  classes: Classes.isRequired,
  onAdd: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  sound: GallerySound.isRequired
}

const mapStateToProps = (state, { soundUuid }) => ({
  target: getGalleryTarget(state)
})

const mapDispatchToProps = {
  onPlay: gallerySound.play
}

export const GalleryItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GalleryItemComponent))
