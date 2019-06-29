import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/Save'
import React from 'react'

import { connect } from 'react-redux'
import { storyRoutines } from '../actions'

const mapStateToProps = (state) => ({
  disabled: false,
  children: <Save />,
  title: 'Save'
})

const mapDispatchToProps = {
  onClick: storyRoutines.save
}

export const WorkspaceSaveButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(IconButton)
