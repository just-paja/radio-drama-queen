import PropTypes from 'prop-types'
import React from 'react'

import { SoundBoard } from '../../soundBoards/containers'
import { connect } from 'react-redux'
import { workspace } from '../actions'

import * as constants from '../constants'

const mapDispatchToProps = {
  onSoundPickerOpen: payload => workspace.selectView(constants.VIEW_LIBRARY, {
    target: payload
  })
}

const SoundBoardViewComponent = ({
  board,
  onSoundPickerOpen
}) => (
  <SoundBoard
    onSoundPickerOpen={onSoundPickerOpen}
    uuid={board}
  />
)

SoundBoardViewComponent.displayName = 'SoundBoardView'
SoundBoardViewComponent.propTypes = {
  board: PropTypes.string,
  onSoundPickerOpen: PropTypes.func.isRequired
}

SoundBoardViewComponent.defaultProps = {
  board: null
}

export const SoundBoardView = connect(
  undefined,
  mapDispatchToProps
)(SoundBoardViewComponent)
