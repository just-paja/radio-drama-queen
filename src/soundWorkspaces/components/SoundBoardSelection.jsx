import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SoundBoardLabel from '../../soundBoards/components/SoundBoardLabel'

import { connect } from 'react-redux'
import { getActiveBoardUuid } from '../selectors'
import { getBoardsWithStatus } from '../../soundBoards/selectors'
import { SoundBoard } from '../../soundBoards/proptypes'
import { SoundBoardMenu } from './SoundBoardMenu'
import { workspace } from '../actions'

class SoundBoardSelectionComponent extends Component {
  constructor () {
    super()
    this.handleBoardChange = this.handleBoardChange.bind(this)
  }

  handleBoardChange (value) {
    const { activeBoard, onBoardSelect } = this.props
    onBoardSelect(value || activeBoard)
  }

  render () {
    const { activeBoard, boards } = this.props
    return (
      <List>
        {boards.map(board => (
          <ListItem
            button
            key={board.uuid}
            onClick={() => this.handleBoardChange(board.uuid)}
            selected={board.uuid === activeBoard}
          >
            <ListItemText>
              <SoundBoardLabel board={board} />
            </ListItemText>
            <ListItemSecondaryAction>
              <SoundBoardMenu boardUuid={board.uuid} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )
  }
}

SoundBoardSelectionComponent.propTypes = {
  activeBoard: PropTypes.string,
  boards: PropTypes.arrayOf(SoundBoard).isRequired,
  onBoardSelect: PropTypes.func.isRequired
}

SoundBoardSelectionComponent.defaultProps = {
  activeBoard: null
}

const mapStateToProps = state => ({
  activeBoard: getActiveBoardUuid(state),
  boards: getBoardsWithStatus(state)
})

const mapDispatchToProps = {
  onBoardSelect: workspace.selectBoard
}

export const SoundBoardSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundBoardSelectionComponent)
