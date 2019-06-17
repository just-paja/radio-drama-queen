import CanvasMessage from '../../components/CanvasMessage'
import Dashboard from '@material-ui/icons/Dashboard'
import LabelButton from '../../components/LabelButton'
import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { connect } from 'react-redux'
import { soundBoard } from '../actions'

const NoBoardsComponent = ({ onBoardCreate, onLibraryOpen }) => (
  <CanvasMessage heading='No boards!'>
    <Typography gutterBottom>
      Sounds are organized in boards and split to categories. To start telling a story, you first need create your first board.
    </Typography>
    <LabelButton onClick={onBoardCreate} icon={Dashboard}>
      Create first board
    </LabelButton>
  </CanvasMessage>
)

NoBoardsComponent.displayName = 'NoBoards'
NoBoardsComponent.propTypes = {
  onBoardCreate: PropTypes.func.isRequired
}

const mapStateToProps = undefined
const mapDispatchToProps = {
  onBoardCreate: soundBoard.create
}

export const NoBoards = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoBoardsComponent)
