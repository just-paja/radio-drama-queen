import PropTypes from 'prop-types'
import React from 'react'

import { Board, NoBoards } from '../../soundBoards/components'
import { boardStore } from '../../soundBoards'
import { connect } from 'react-redux'
import { workspaceRoutines } from '../actions'

import * as constants from '../constants'

const SoundBoardViewComponent = ({
  board,
  noBoards,
  onSoundPickerOpen
}) => {
  if (noBoards) {
    return <NoBoards />
  }
  return (
    <Board
      onSoundPickerOpen={onSoundPickerOpen}
      uuid={board}
    />
  )
}

SoundBoardViewComponent.displayName = 'SoundBoardView'
SoundBoardViewComponent.propTypes = {
  board: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired
}

SoundBoardViewComponent.defaultProps = {
  board: null
}

const mapStateToProps = state => ({
  noBoards: boardStore.isEmpty(state)
})

const mapDispatchToProps = {
  onSoundPickerOpen: payload => workspaceRoutines.selectView(constants.VIEW_LIBRARY, {
    target: payload
  })
}

export const SoundBoardView = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundBoardViewComponent)
