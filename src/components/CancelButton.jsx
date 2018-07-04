import Button from '@material-ui/core/Button';
import React from 'react';

const AddButton = ({ ...props }) => (
  <Button size="small" {...props}>
    Cancel
  </Button>
);

export default AddButton;
