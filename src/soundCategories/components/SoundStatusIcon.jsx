import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';

const SoundStatusIcon = ({
  error,
  loading,
  onClick,
  playing,
  ...props
}) => {
  let IconComponent;

  if (error) {
    return <ErrorIcon {...props} color="error" />;
  } else {
    IconComponent = playing ? Stop : PlayArrow;
    if (loading) {
      IconComponent = CircularProgress;
    }
  }

  return <IconComponent {...props} />;
};

SoundStatusIcon.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  playing: PropTypes.bool,
};

SoundStatusIcon.defaultProps = {
  error: null,
  loading: false,
  playing: false,
};

export default SoundStatusIcon;
