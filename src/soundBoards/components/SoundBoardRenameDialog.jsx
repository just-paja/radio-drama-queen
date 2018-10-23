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

const SoundBoardRenameDialog = ({
  handleSubmit,
  onClose,
  open,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="boardRenameDialog"
  >
    {open ? (
      <Form onSubmit={handleSubmit}>
        <DialogTitle id="boardRenameDialog">
          Rename Sound Board
        </DialogTitle>
        <DialogContent>
          <Field
            autoFocus
            component={Input}
            label="Sound Board name"
            name="name"
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

SoundBoardRenameDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

SoundBoardRenameDialog.defaultProps = {
  open: false,
};

export default SoundBoardRenameDialog;
