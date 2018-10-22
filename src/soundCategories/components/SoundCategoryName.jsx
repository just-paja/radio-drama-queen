import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import SoundCategoryRename from '../containers/SoundCategoryRename';

const SoundCategoryName = ({
  edit,
  name,
  uuid,
}) => {
  if (edit) {
    return <SoundCategoryRename categoryUuid={uuid} />;
  }
  return (
  <Typography variant="h5">
    {name || 'Default'}
  </Typography>
  );
};

SoundCategoryName.propTypes = {
  edit: PropTypes.bool,
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired,
};

SoundCategoryName.defaultProps = {
  edit: false,
  name: null,
};

export default SoundCategoryName;
