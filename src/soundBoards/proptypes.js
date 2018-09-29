import PropTypes from 'prop-types';

export const SoundBoard = PropTypes.shape({
  name: PropTypes.string,
  playing: PropTypes.bool,
  uuid: PropTypes.string,
});

export default { SoundBoard };
