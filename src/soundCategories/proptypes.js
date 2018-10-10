import PropTypes from 'prop-types';

export const SoundCategory = PropTypes.shape({
  name: PropTypes.string,
  uuid: PropTypes.string.isRequired,
});

export default { SoundCategory };
