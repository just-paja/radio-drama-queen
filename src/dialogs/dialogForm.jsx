import CancelButton from '../components/CancelButton'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import OpenButton from '../components/OpenButton'
import React from 'react'

import { boardDialog } from './boardDialog'
import { Form, reduxForm } from 'redux-form'

export function dialogForm ({
  dialog,
  fullScreen,
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
            {title && (
              <DialogTitle id={dialog}>
                {title}
              </DialogTitle>
            )}
            <DialogContent>
              <Component onClose={onClose} {...other} />
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

    function mapInnerStateToProps (state, ownProps) {
      const componentState = {
        initialValues: initialValues && initialValues(state, ownProps)
      }
      return mapStateToProps
        ? { ...componentState, ...mapStateToProps(state, ownProps) }
        : componentState
    }

    const mapDispatchToProps = {
      onSubmit
    }

    return boardDialog({
      dialog,
      fullScreen,
      initialValues,
      mapStateToProps: mapInnerStateToProps,
      mapDispatchToProps,
      title
    })(FormComponent)
  }
}
