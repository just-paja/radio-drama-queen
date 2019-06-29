import PropTypes from 'prop-types'
import React from 'react'

import { Board } from '../../soundBoards/components'
import { connect } from 'react-redux'
import { workspaceRoutines } from '../actions'

import * as constants from '../constants'

const SoundBoardViewComponent = ({
  board,
  onSoundPickerOpen
}) => (
  <React.Fragment>
    <Board
      onSoundPickerOpen={onSoundPickerOpen}
      uuid={board}
    />
  </React.Fragment>
)

SoundBoardViewComponent.displayName = 'SoundBoardView'
SoundBoardViewComponent.propTypes = {
  board: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired
}

SoundBoardViewComponent.defaultProps = {
  board: null
}

const mapDispatchToProps = {
  onSoundPickerOpen: payload => workspaceRoutines.selectView(constants.VIEW_LIBRARY, {
    target: payload
  })
}

export const SoundBoardView = connect(
  undefined,
  mapDispatchToProps
)(SoundBoardViewComponent)
