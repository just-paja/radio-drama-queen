import PropTypes from 'prop-types'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import React from 'react'

import { boardRoutines, boardStore, getBoardCategoryUuids } from '../../soundBoards'
import { categoryRoutines } from '../../soundCategories'
import { connect } from 'react-redux'
import { getFocusedCategory, getFocusedSound } from '../selectors'
import { isAnyDialogOpen } from '../../dialogs'
import { ListShortcuts, noArgs } from '../../components'
import { workspaceRoutines } from '../actions'

class BoardShortcutsComponent extends React.PureComponent {
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
    const hasFocusedCategory = categories.length && (!focusedCategory || categories.indexOf(focusedCategory) !== -1)
    if (!hasFocusedCategory && board && categories.length === 0) {
      onBoardRemove(board)
    }
  }

  render () {
    const { categories, focusedCategory, onBoardCreate, openDialogs } = this.props
    if (openDialogs) {
      return null
    }
    return (
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
        <ListShortcuts
          disabled={openDialogs}
          horizontal
          focused={focusedCategory}
          items={categories}
          onFocus={this.props.onCategoryFocus}
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
    )
  }
}

BoardShortcutsComponent.displayName = 'SoundBoardView'
BoardShortcutsComponent.propTypes = {
  board: PropTypes.string,
  onBoardCreate: PropTypes.func.isRequired,
  onBoardRemove: PropTypes.func.isRequired,
  openDialogs: PropTypes.bool
}

BoardShortcutsComponent.defaultProps = {
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
  onCategoryFocus: categoryRoutines.focus
}

export const BoardShortcuts = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardShortcutsComponent)
