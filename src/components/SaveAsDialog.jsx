import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import CancelButton from './CancelButton';
import Input from './Input';
import SaveButton from './SaveButton';

const SaveAsDialog = ({
  handleSubmit,
  onClose,
  open,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="saveAsDialogTitle"
  >
    <Form onSubmit={handleSubmit}>
      <DialogTitle id="saveAsDialogTitle">
        Save Library as
      </DialogTitle>
      <DialogContent>
        <Field
          autoFocus
          component={Input}
          label="File system path"
          name="fsPath"
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SaveButton>
          Save
        </SaveButton>
      </DialogActions>
    </Form>
  </Dialog>
);

SaveAsDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

SaveAsDialog.defaultProps = {
  open: false,
};

export default SaveAsDialog;
