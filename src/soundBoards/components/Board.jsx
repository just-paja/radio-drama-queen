import classnames from 'classnames'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SoundBoardCategory from './SoundBoardCategory'

import { BoardEmpty } from './BoardEmpty'
import { BoardRenameDialog } from './BoardRenameDialog'
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
  grow: {
    flexGrow: 1
  },
  gridSpacing: {
    padding: theme.spacing(1),
    minWidth: 320,
    alignContent: 'start'
  },
  canDrop: {
    background: theme.palette.dropTarget
  }
})

const renderCategories = (categories, onSoundPickerOpen) =>
  categories.map(categoryUuid => (
    <SoundBoardCategory
      key={categoryUuid}
      onSoundPickerOpen={onSoundPickerOpen}
      uuid={categoryUuid}
    />
  ))

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
    const gridClasses = classnames(classes.grow, classes.gridSpacing, {
      [classes.canDrop]: isOver && canDrop
    })
    let content
    if (categories.length === 0) {
      content = (<BoardEmpty board={uuid} />)
    } else {
      content = []
      content.push(renderCategories(categories, onSoundPickerOpen))
    }
    // Wrapping div is necessary for react-dnd
    return connectDropTarget(
      <div className={classes.board}>
        <BoardRenameDialog boardUuid={uuid} />
        <Grid className={gridClasses} container>
          {content}
          <BoardSpeedDial
            boardUuid={uuid}
            onSoundAdd={this.handleSoundPickerOpen}
          />
          {renderSnackbar(isOver, canDrop)}
        </Grid>
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
