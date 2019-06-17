import CanvasMessage from '../../components/CanvasMessage'
import LabelButton from '../../components/LabelButton'
import List from '@material-ui/icons/List'
import React from 'react'
import Typography from '@material-ui/core/Typography'

import { categoryCreate } from '../actions'
import { connect } from 'react-redux'

const SoundBoardEmptyComponent = ({ onCategoryCreate }) => (
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
  onCategoryCreate: categoryCreate.formShow
}

export const SoundBoardEmpty = connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundBoardEmptyComponent)
