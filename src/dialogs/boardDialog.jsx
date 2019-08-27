import Dialog from '@material-ui/core/Dialog'
import React from 'react'

import { connect } from 'react-redux'
import { dialogRoutines } from './actions'
import { isDialogOpen } from './store'

export function boardDialog ({
  dialog,
  fullScreen,
  mapDispatchToProps,
  mapStateToProps,
  mergeProps,
  title,
  ...directProps
}) {
  return function (Component) {
    function BoardDialog ({ onClose, open, ...other }) {
      return (
        <Dialog
          aria-labelledby={dialog}
          fullScreen={fullScreen}
          onClose={onClose}
          open={open}
        >
          {open && (
            <Component
              open={open}
              onClose={onClose}
              {...directProps}
              {...other}
            />
          )}
        </Dialog>
      )
    }

    function mapInnerStateToProps (state, ownProps) {
      const componentState = {
        open: isDialogOpen(state, dialog)
      }
      return mapStateToProps
        ? { ...componentState, ...mapStateToProps(state, ownProps) }
        : componentState
    }

    function closeDialog (meta) {
      return dialogRoutines.close(dialog, meta)
    }

    function openDialog (meta) {
      return dialogRoutines.open(dialog, meta)
    }

    const mapInnerDispatchToProps = {
      ...mapDispatchToProps,
      onClose: closeDialog
    }

    const DialogComponent = connect(
      mapInnerStateToProps,
      mapInnerDispatchToProps,
      mergeProps
    )(BoardDialog)
    DialogComponent.close = closeDialog
    DialogComponent.open = openDialog
    return DialogComponent
  }
}
