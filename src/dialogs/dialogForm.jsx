import CancelButton from '../components/CancelButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import OpenButton from '../components/OpenButton'
import React from 'react'

import { connect } from 'react-redux'
import { dialogRoutines } from './actions'
import { Form, reduxForm } from 'redux-form'
import { isDialogOpen } from './store'

export function dialogForm ({
  dialog,
  initialValues,
  mapStateToProps,
  onSubmit,
  submitLabel = 'Save',
  title
}) {
  return function (Component) {
    class BoardDialogForm extends React.Component {
      render () {
        const {
          handleSubmit,
          onClose,
          open,
          ...other
        } = this.props
        return (
          <Form onSubmit={handleSubmit}>
            <DialogTitle id={dialog}>
              {title}
            </DialogTitle>
            <DialogContent>
              <Component {...other} />
            </DialogContent>
            <DialogActions>
              <CancelButton onClick={onClose} />
              <OpenButton type='submit'>
                {submitLabel}
              </OpenButton>
            </DialogActions>
          </Form>
        )
      }
    }

    const FormComponent = reduxForm({ form: dialog })(BoardDialogForm)

    class BoardDialog extends React.Component {
      render () {
        const { onClose, open, ...other } = this.props
        return (
          <Dialog
            aria-labelledby={dialog}
            onClose={onClose}
            open={open}
          >
            {open && <FormComponent open={open} onClose={onClose} {...other} />}
          </Dialog>
        )
      }
    }

    function mapInnerStateToProps (state, ownProps) {
      const componentState = {
        initialValues: initialValues && initialValues(state, ownProps),
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

    const mapDispatchToProps = {
      onClose: closeDialog,
      onSubmit
    }

    const DialogComponent = connect(mapInnerStateToProps, mapDispatchToProps)(BoardDialog)
    DialogComponent.close = closeDialog
    DialogComponent.open = openDialog
    return DialogComponent
  }
}
