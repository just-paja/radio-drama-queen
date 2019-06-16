import IconButton from '@material-ui/core/IconButton'
import Save from '@material-ui/icons/Save'
import React from 'react'

import { connect } from 'react-redux'
import { isWorkspaceEmpty } from '../selectors'
import { workspaceSave } from '../actions'

const mapStateToProps = (state) => ({
  disabled: isWorkspaceEmpty(state),
  children: <Save />,
  title: 'Save'
})

const mapDispatchToProps = {
  onClick: workspaceSave.trigger
}

export const WorkspaceSaveButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(IconButton)
