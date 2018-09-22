import PropTypes from 'prop-types';
import React from 'react';

import SoundGalleryItem from './SoundGalleryItem';

import { GallerySound } from '../proptypes';

const SoundGallery = ({ sounds }) => (
  <div>
    {sounds.map(sound => (
      <SoundGalleryItem
        sound={sound}
        key={sound.uuid}
      />
    ))}
  </div>
);

SoundGallery.propTypes = {
  sounds: PropTypes.arrayOf(GallerySound).isRequired,
};

export default SoundGallery;
