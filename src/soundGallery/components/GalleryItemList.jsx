import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { GalleryItem } from './GalleryItem'
import { gallerySound } from '../actions'
import { GallerySound, GalleryTarget } from '../proptypes'
import { getGallerySoundList, getGalleryTarget } from '../selectors'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  body: {
    padding: theme.spacing()
  }
})

const GalleryItemListComponent = ({
  classes,
  onSoundAdd,
  onSoundPlay,
  onTagAdd,
  sounds,
  target
}) => (
  <Paper className={classes.body}>
    {sounds.map(sound => (
      <GalleryItem
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

GalleryItemListComponent.displayName = 'GalleryItemList'
GalleryItemListComponent.propTypes = {
  classes: Classes.isRequired,
  onSoundAdd: PropTypes.func.isRequired,
  onTagAdd: PropTypes.func.isRequired,
  onSoundPlay: PropTypes.func.isRequired,
  sounds: PropTypes.arrayOf(GallerySound).isRequired,
  target: GalleryTarget
}

GalleryItemListComponent.defaultProps = {
  target: null
}

const mapStateToProps = state => ({
  sounds: getGallerySoundList(state),
  target: getGalleryTarget(state)
})

const mapDispatchToProps = {
  onSoundPlay: gallerySound.play
}

export const GalleryItemList = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GalleryItemListComponent))
