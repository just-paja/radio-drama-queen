import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

import { BoardCategory } from './BoardCategory'
import { BoardEmpty } from './BoardEmpty'
import { boardRoutines } from '../actions'
import { BoardSpeedDial } from './BoardSpeedDial'
import { categoryRoutines } from '../../soundCategories'
import { connect } from 'react-redux'
import { connectSoundDropTarget } from '../../sounds/containers'
import { getBoardCategoryUuids } from '../selectors'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  board: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  gridSpacing: {
    minWidth: 320,
    padding: theme.spacing(1)
  },
  canDrop: {
    background: theme.palette.dropTarget
  }
})

const renderCategories = (gridClasses, categories, onSoundPickerOpen) => (
  <Grid alignItems='flex-start' className={gridClasses} container>
    {categories.map(categoryUuid => (
      <BoardCategory
        key={categoryUuid}
        onSoundPickerOpen={onSoundPickerOpen}
        uuid={categoryUuid}
      />
    ))}
  </Grid>
)

const renderSnackbar = (isOver, canDrop) => (
  <Snackbar
    open={canDrop && isOver}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    message='Drop sounds here to create a new category'
  />
)

class BoardComponent extends Component {
  constructor () {
    super()
    this.handleSoundPickerOpen = this.handleSoundPickerOpen.bind(this)
  }

  handleSoundPickerOpen () {
    const { uuid, onSoundPickerOpen } = this.props
    onSoundPickerOpen({
      board: uuid
    })
  }

  render () {
    const {
      canDrop,
      categories,
      classes,
      connectDropTarget,
      isOver,
      onSoundPickerOpen,
      uuid
    } = this.props
    // Wrapping div is necessary for react-dnd
    return connectDropTarget(
      <div
        className={classnames(classes.board, {
          [classes.canDrop]: isOver && canDrop
        })}
      >
        {categories.length > 0
          ? renderCategories(classes.gridSpacing, categories, onSoundPickerOpen)
          : <BoardEmpty board={uuid} />
        }
        {renderSnackbar(isOver, canDrop)}
        <BoardSpeedDial
          boardUuid={uuid}
          onSoundAdd={this.handleSoundPickerOpen}
        />
      </div>
    )
  };
};

BoardComponent.displayName = 'Board'
BoardComponent.propTypes = {
  canDrop: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  onSoundPickerOpen: PropTypes.func.isRequired,
  showCreateForm: PropTypes.bool,
  uuid: PropTypes.string
}

BoardComponent.defaultProps = {
  canDrop: false,
  isOver: false,
  showCreateForm: false
}

const mapStateToProps = (state, { uuid }) => ({
  categories: getBoardCategoryUuids(state, uuid)
})

const mapDispatchToProps = {
  onAdd: categoryRoutines.create,
  onDrop: boardRoutines.soundDrop
}

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps
)(connectSoundDropTarget(withStyles(styles)(BoardComponent)))
