import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import React from 'react'

import { Board, NoBoards } from '../../soundBoards/components'
import { boardRoutines, boardStore, getBoardCategoryUuids } from '../../soundBoards'
import { categoryRoutines } from '../../soundCategories'
import { connect } from 'react-redux'
import { getFocusedCategory, getFocusedSound } from '../selectors'
import { isAnyDialogOpen } from '../../dialogs'
import { noArgs } from '../../components'
import { withStyles } from '@material-ui/core/styles'
import { workspaceRoutines } from '../actions'
import { WorkspaceSidebar } from './WorkspaceSidebar'

import * as constants from '../constants'

const styles = theme => ({
  sidebar: {
    minWidth: theme.spacing(24)
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1
  },
  withHeader: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

class SoundBoardViewComponent extends React.PureComponent {
  constructor (props) {
    super(props)
    this.createCategory = this.createCategory.bind(this)
    this.nextBoard = this.nextBoard.bind(this)
    this.nextCategory = this.nextCategory.bind(this)
    this.prevBoard = this.prevBoard.bind(this)
    this.prevCategory = this.prevCategory.bind(this)
    this.removeBoard = this.removeBoard.bind(this)
  }

  get boardIndex () {
    const { board, boards } = this.props
    return boards.findIndex(b => b.uuid === board)
  }

  get categoryIndex () {
    const { focusedCategory, categories } = this.props
    return categories.indexOf(focusedCategory)
  }

  createCategory () {
    if (this.props.board) {
      this.props.onCategoryCreate(this.props.board)
    }
  }

  focusBoardIndex (boardIndex) {
    const board = this.props.boards[boardIndex]
    if (board) {
      this.props.onBoardSelect(board.uuid)
    }
  }

  focusCategoryIndex (boardIndex) {
    const categoryUuid = this.props.categories[boardIndex]
    if (categoryUuid) {
      this.props.onCategoryFocus(categoryUuid)
    }
  }

  nextBoard () {
    this.focusBoardIndex(this.boardIndex + 1)
  }

  nextCategory () {
    this.focusCategoryIndex(this.categoryIndex + 1)
  }

  prevBoard () {
    this.focusBoardIndex(this.boardIndex - 1)
  }

  prevCategory () {
    this.focusCategoryIndex(this.categoryIndex - 1)
  }

  removeBoard () {
    const { board, categories, focusedCategory, onBoardRemove } = this.props
    const hasFocusedCategory = !focusedCategory || categories.indexOf(focusedCategory) !== -1
    if (!hasFocusedCategory && board && categories.length === 0) {
      onBoardRemove(board)
    }
  }

  renderContent () {
    const {
      board,
      focusedCategory,
      focusedSound,
      noBoards,
      onSoundPickerOpen
    } = this.props
    if (noBoards) {
      return <NoBoards />
    }
    return (
      <Board
        focusedCategory={focusedCategory}
        focusedSound={focusedSound}
        onSoundPickerOpen={onSoundPickerOpen}
        uuid={board}
      />
    )
  }

  render () {
    const { classes, onBoardCreate, openDialogs } = this.props
    return (
      <div className={classes.view}>
        <WorkspaceSidebar />
        {this.renderContent()}
        {!openDialogs && (
          <React.Fragment>
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['b']}
              onKeyEvent={onBoardCreate}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['c']}
              onKeyEvent={this.createCategory}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['left']}
              onKeyEvent={this.prevCategory}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['right']}
              onKeyEvent={this.nextCategory}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['pagedown']}
              onKeyEvent={this.nextBoard}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['pageup']}
              onKeyEvent={this.prevBoard}
            />
            <KeyboardEventHandler
              handleFocusableElements
              handleKeys={['delete']}
              onKeyEvent={this.removeBoard}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

SoundBoardViewComponent.displayName = 'SoundBoardView'
SoundBoardViewComponent.propTypes = {
  board: PropTypes.string,
  onBoardCreate: PropTypes.func.isRequired,
  onBoardRemove: PropTypes.func.isRequired,
  openDialogs: PropTypes.bool,
  onSoundPickerOpen: PropTypes.func.isRequired
}

SoundBoardViewComponent.defaultProps = {
  board: null,
  openDialogs: false
}

const mapStateToProps = (state, ownProps) => ({
  boards: boardStore.getAll(state),
  categories: getBoardCategoryUuids(state, ownProps.board),
  focusedCategory: getFocusedCategory(state),
  focusedSound: getFocusedSound(state),
  noBoards: boardStore.isEmpty(state),
  openDialogs: isAnyDialogOpen(state)
})

const mapDispatchToProps = {
  onBoardCreate: noArgs(boardRoutines.create),
  onBoardRemove: boardRoutines.remove,
  onBoardSelect: workspaceRoutines.selectBoard,
  onCategoryCreate: boardRoutines.createCategory,
  onCategoryFocus: categoryRoutines.focus,
  onSoundPickerOpen: payload => workspaceRoutines.selectView(constants.VIEW_LIBRARY, {
    target: payload
  })
}

export const SoundBoardView = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SoundBoardViewComponent))
