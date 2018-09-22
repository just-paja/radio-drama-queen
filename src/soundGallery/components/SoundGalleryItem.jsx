import React from 'react';

import SoundTag from '../../tags/containers/SoundTag';

import { GallerySound } from '../proptypes';

const SoundGalleryItem = ({ sound }) => (
  <div>
    {sound.name}
    {sound.tags.map(tag => (
      <SoundTag tag={tag} key={tag.name} />
    ))}
  </div>
);

SoundGalleryItem.propTypes = {
  sound: GallerySound.isRequired,
};

export default SoundGalleryItem;
