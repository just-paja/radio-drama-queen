import PropTypes from 'prop-types'
import React from 'react'

import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { GalleryEmpty } from './GalleryEmpty'
import { GalleryItemList } from './GalleryItemList'
import { GallerySearch } from './GallerySearch'
import { GallerySpeedDial } from './GallerySpeedDial'
import { GalleryTarget } from './GalleryTarget'
import { GalleryTarget as GalleryTargetProp } from '../proptypes'
import { getGalleryTarget } from '../selectors'
import { soundStore } from '../../sounds'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  box: {
    flexGrow: 1
  },
  layout: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    paddingTop: 2 * theme.spacing(1)
  }
})

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
    content = (
      <GalleryEmpty
        onConfigOpen={onConfigOpen}
        onLibraryOpen={onLibraryOpen}
      />
    )
  } else {
    content = (
      <div className={classes.box}>
        <GalleryTarget
          board={target.board}
          category={target.category}
          onGoBack={onGoBack}
        />
        <div className={classes.layout}>
          <GallerySearch />
          <GalleryItemList
            onSoundAdd={onAddSound}
            onTagAdd={onAddTag}
          />
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      {content}
      <GallerySpeedDial onBoardCreate={onBoardCreate} />
    </React.Fragment>
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
  onGoBack: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired,
  target: GalleryTargetProp
}

GalleryComponent.defaultProps = {
  GalleryTarget: null
}

function mapStateToProps (state) {
  return {
    librarySize: soundStore.getSize(state),
    target: getGalleryTarget(state)
  }
}

export const Gallery = connect(mapStateToProps)(withStyles(styles)(GalleryComponent))
