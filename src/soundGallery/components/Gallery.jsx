import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { GalleryEmpty } from './GalleryEmpty'
import { GalleryItemList } from './GalleryItemList'
import { GallerySpeedDial } from './GallerySpeedDial'
import { GalleryTree } from './GalleryTree'
import { soundStore } from '../../sounds'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  box: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row'
  },
  layout: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.md,
    paddingTop: 2 * theme.spacing(1)
  }
})

function renderEmpty (onConfigOpen, onLibraryOpen) {
  return (
    <GalleryEmpty
      onConfigOpen={onConfigOpen}
      onLibraryOpen={onLibraryOpen}
    />
  )
}

const GalleryComponent = ({
  classes,
  librarySize,
  onAddSound,
  onAddTag,
  onBoardCreate,
  onConfigOpen,
  onGoBack,
  onLibraryOpen,
  target
}) => {
  let content
  if (librarySize === 0) {
    content = renderEmpty(onConfigOpen, onLibraryOpen)
  } else {
    content = (
      <div className={classes.box}>
        <GalleryTree />
        <GalleryItemList
          onSoundAdd={onAddSound}
          onTagAdd={onAddTag}
        />
      </div>
    )
  }

  return (
    <>
      {content}
      <GallerySpeedDial onBoardCreate={onBoardCreate} />
    </>
  )
}

GalleryComponent.displayName = 'Gallery'
GalleryComponent.propTypes = {
  classes: Classes.isRequired,
  librarySize: PropTypes.number.isRequired,
  onAddSound: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onBoardCreate: PropTypes.func.isRequired,
  onConfigOpen: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired
}

GalleryComponent.defaultProps = {
  GalleryTarget: null
}

function mapStateToProps (state) {
  return {
    librarySize: soundStore.getSize(state)
  }
}

export const Gallery = connect(mapStateToProps)(withStyles(styles)(GalleryComponent))
