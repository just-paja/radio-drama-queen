import React from 'react';

import { SoundTag as SoundTagPropType } from '../proptypes';

const SoundTag = ({ tag }) => (
  <span>
    #
    {(tag.title && tag.title.cs) || tag.name}
  </span>
);

SoundTag.propTypes = {
  tag: SoundTagPropType.isRequired,
};

export default SoundTag;
