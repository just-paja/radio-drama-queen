import PropTypes from 'prop-types';

export const Sound = PropTypes.shape({
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  valid: PropTypes.bool,
});
