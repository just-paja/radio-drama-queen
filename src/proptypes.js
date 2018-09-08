import PropTypes from 'prop-types';

export const Classes = PropTypes.objectOf(PropTypes.string);

export const Sound = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  name: PropTypes.string,
  playing: PropTypes.bool,
  valid: PropTypes.bool,
});

export default { Sound };
