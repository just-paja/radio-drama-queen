import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

import { Field, Form } from 'redux-form';

import CancelButton from '../../components/CancelButton';
import Input from '../../components/Input';
import OpenButton from '../../components/OpenButton';

const WorkspaceSaveDialog = ({
  handleSubmit,
  onClose,
  open,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="workspaceDestinationDialogTitle"
  >
    {open ? (
      <Form onSubmit={handleSubmit}>
        <DialogTitle id="workspaceDestinationDialogTitle">
          Save workspace
        </DialogTitle>
        <DialogContent>
          <Field
            autoFocus
            component={Input}
            label="File system path"
            name="path"
          />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <OpenButton type="submit">
            Save
          </OpenButton>
        </DialogActions>
      </Form>
    ) : ''}
  </Dialog>
);

WorkspaceSaveDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

WorkspaceSaveDialog.defaultProps = {
  open: false,
};

export default WorkspaceSaveDialog;
