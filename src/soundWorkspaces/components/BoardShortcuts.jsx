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
    this.handleCategoryCreate = this.handleCategoryCreate.bind(this)
    this.handleNextBoard = this.handleNextBoard.bind(this)
    this.handleNextCategory = this.handleNextCategory.bind(this)
    this.handlePrevBoard = this.handlePrevBoard.bind(this)
    this.handlePrevCategory = this.handlePrevCategory.bind(this)
    this.handleRemoveBoard = this.handleRemoveBoard.bind(this)
  }

  get boardIndex () {
    const { board, boards } = this.props
    return boards.findIndex(b => b.uuid === board)
  }

  get categoryIndex () {
    const { focusedCategory, categories } = this.props
    return categories.indexOf(focusedCategory)
  }

  handleCategoryCreate () {
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

  handleNextBoard () {
    this.focusBoardIndex(this.boardIndex + 1)
  }

  handleNextCategory () {
    this.focusCategoryIndex(this.categoryIndex + 1)
  }

  handlePrevBoard () {
    this.focusBoardIndex(this.boardIndex - 1)
  }

  handlePrevCategory () {
    this.focusCategoryIndex(this.categoryIndex - 1)
  }

  handleRemoveBoard () {
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
      <>
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['b']}
          onKeyEvent={onBoardCreate}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['c']}
          onKeyEvent={this.handleCategoryCreate}
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
          onKeyEvent={this.handleNextBoard}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['pageup']}
          onKeyEvent={this.handlePrevBoard}
        />
        <KeyboardEventHandler
          handleFocusableElements
          handleKeys={['delete']}
          onKeyEvent={this.handleRemoveBoard}
        />
      </>
    )
  }
}

BoardShortcutsComponent.displayName = 'BoardShortcuts'
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
