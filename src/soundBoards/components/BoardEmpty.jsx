import CanvasMessage from '../../components/CanvasMessage'
import LabelButton from '../../components/LabelButton'
import List from '@material-ui/icons/List'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { boardRoutines } from '../actions'
import { connect } from 'react-redux'

const BoardEmptyComponent = ({ onCategoryCreate }) => (
  <CanvasMessage heading='No sound categories!'>
    <Typography gutterBottom>
      Sound categories help you organize sounds so you can find what you
      want to play just by visual inspection.
    </Typography>
    <LabelButton onClick={onCategoryCreate} icon={List}>
      Create category
    </LabelButton>
  </CanvasMessage>
)

const mapStateToProps = undefined

const mapDispatchToProps = {
  onCategoryCreate: boardRoutines.createCategory
}

function mergeProps (stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onCategoryCreate: () => dispatchProps.onCategoryCreate(ownProps.board)
  }
}

export const BoardEmpty = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BoardEmptyComponent)
