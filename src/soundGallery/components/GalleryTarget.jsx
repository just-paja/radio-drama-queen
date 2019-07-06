import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import React from 'react'

import { boardStore } from '../../soundBoards'
import { categoryStore } from '../../soundCategories'
import { Classes } from '../../proptypes'
import { connect } from 'react-redux'
import { SoundBoard } from '../../soundBoards/proptypes'
import { SoundCategory } from '../../soundCategories/proptypes'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  target: {
    background: theme.palette.grey[300]
  },
  container: {
    margin: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    display: 'flex'
  },
  text: {
    margin: 'auto'
  }
})

const GalleryTargetComponent = ({
  classes,
  board,
  category,
  onGoBack
}) => {
  if (!board) {
    return null
  }
  const boardLabel = board ? (
    <span>{board.name}</span>
  ) : null
  const categoryLabel = board && category ? (
    <span>
      {' '}&gt;{' '}
      {category && (category.name || 'Default')}
    </span>
  ) : null
  return (
    <div className={classes.target}>
      <div className={classes.container}>
        <IconButton onClick={onGoBack}>
          <ArrowBack />
        </IconButton>
        <div className={classes.text}>
          Adding sounds to:{' '}
          {boardLabel}
          {categoryLabel}
        </div>
      </div>
    </div>
  )
}

GalleryTargetComponent.displayName = 'GalleryTarget'
GalleryTargetComponent.propTypes = {
  board: SoundBoard,
  category: SoundCategory,
  classes: Classes.isRequired,
  onGoBack: PropTypes.func.isRequired
}

GalleryTargetComponent.defaultProps = {
  board: null,
  category: null
}

function mapStateToProps (state, { board, category }) {
  return {
    board: boardStore.getFirst(state, board),
    category: categoryStore.getFirst(state, category)
  }
}

export const GalleryTarget = connect(
  mapStateToProps
)(withStyles(styles)(GalleryTargetComponent))
