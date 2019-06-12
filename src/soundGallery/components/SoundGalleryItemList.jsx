import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import SoundGalleryItem from './SoundGalleryItem'

import { GallerySound, GalleryTarget } from '../proptypes'
import { Classes } from '../../proptypes'

const styles = theme => ({
  body: {
    padding: theme.spacing()
  }
})

const SoundGalleryItemList = ({
  classes,
  onSoundAdd,
  onSoundPlay,
  onTagAdd,
  sounds,
  target
}) => (
  <Paper className={classes.body}>
    {sounds.map(sound => (
      <SoundGalleryItem
        key={sound.uuid}
        onPlay={onSoundPlay}
        onAdd={onSoundAdd}
        onAddTag={onTagAdd}
        sound={sound}
        target={target}
      />
    ))}
  </Paper>
)

SoundGalleryItemList.propTypes = {
  classes: Classes.isRequired,
  onSoundAdd: PropTypes.func.isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onSoundPlay: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(GallerySound).isRequired,
  target: GalleryTarget
}

SoundGalleryItemList.defaultProps = {
  target: null
}

export default withStyles(styles)(SoundGalleryItemList)
