import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { getActiveBoardUuid } from '../selectors'
import { getBoardsWithStatus } from '../../soundBoards/selectors'
import { SoundBoard } from '../../soundBoards/proptypes'
import { SoundBoardSelectionItem } from './SoundBoardSelectionItem'

const SoundBoardSelectionComponent = ({ activeBoard, boards }) => (
  <List>
    {boards.map(board =>
      <SoundBoardSelectionItem
        board={board}
        key={board.uuid}
        selected={board.uuid === activeBoard}
      />
    )}
  </List>
)

SoundBoardSelectionComponent.displayName = 'SoundBoardSelection'
SoundBoardSelectionComponent.propTypes = {
  activeBoard: PropTypes.string,
  boards: PropTypes.arrayOf(SoundBoard).isRequired
}

SoundBoardSelectionComponent.defaultProps = {
  activeBoard: null
}

const mapStateToProps = state => ({
  activeBoard: getActiveBoardUuid(state),
  boards: getBoardsWithStatus(state)
})

export const SoundBoardSelection = connect(
  mapStateToProps
)(SoundBoardSelectionComponent)
