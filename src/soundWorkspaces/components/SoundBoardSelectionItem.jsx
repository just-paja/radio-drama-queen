import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SoundBoardLabel from '../../soundBoards/components/SoundBoardLabel'

import { BoardContextMenu } from '../../soundBoards/components'
import { connect } from 'react-redux'
import { getActiveBoardUuid } from '../selectors'
import { getBoardsWithStatus } from '../../soundBoards/selectors'
import { SoundBoard } from '../../soundBoards/proptypes'
import { workspaceRoutines } from '../actions'

class SoundBoardSelectionItemComponent extends Component {
  constructor () {
    super()
    this.handleBoardChange = this.handleBoardChange.bind(this)
  }

  handleBoardChange (value) {
    this.props.onBoardSelect(this.props.board.uuid)
  }

  render () {
    const { selected, board } = this.props
    return (
      <BoardContextMenu boardUuid={board.uuid}>
        <ListItem
          button
          key={board.uuid}
          onClick={this.handleBoardChange}
          selected={selected}
        >
          <ListItemText>
            <SoundBoardLabel board={board} />
          </ListItemText>
        </ListItem>
      </BoardContextMenu>
    )
  }
}

SoundBoardSelectionItemComponent.displayName = 'SoundBoardSelectionItem'
SoundBoardSelectionItemComponent.propTypes = {
  board: SoundBoard.isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool
}

SoundBoardSelectionItemComponent.defaultProps = {
  selected: false
}

const mapStateToProps = state => ({
  activeBoard: getActiveBoardUuid(state),
  boards: getBoardsWithStatus(state)
})

const mapDispatchToProps = {
  onBoardSelect: workspaceRoutines.selectBoard
}

export const SoundBoardSelectionItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundBoardSelectionItemComponent)
