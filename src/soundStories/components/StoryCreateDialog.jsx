import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import React from 'react'

import { connect } from 'react-redux'
import { isStoryCreateDialogVisible } from '../selectors'
import { storyCreate } from '../actions'
import { StoryCreateForm } from './StoryCreateForm'

const StoryCreateDialogComponent = ({
  handleSubmit,
  onClose,
  open
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby='workspaceDestinationDialogTitle'
  >
    {open && <StoryCreateForm />}
  </Dialog>
)

StoryCreateDialogComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
}

StoryCreateDialogComponent.defaultProps = {
  open: false
}

const mapStateToProps = state => ({
  open: isStoryCreateDialogVisible(state)
})

const mapDispatchToProps = {
  onClose: storyCreate.close
}

export const StoryCreateDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryCreateDialogComponent)
