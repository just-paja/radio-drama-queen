import PropTypes from 'prop-types';

export const SoundTag = PropTypes.shape({
  name: PropTypes.string,
  title: PropTypes.objectOf(PropTypes.string),
});

export default { SoundTag };
