import React from 'react';
import Save from '@material-ui/icons/Save';

import LabelButton from './LabelButton';

const SaveButton = () => (
  <LabelButton icon={Save} type="submit">
    Save
  </LabelButton>
);

export default SaveButton;
