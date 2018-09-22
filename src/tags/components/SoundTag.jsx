import React from 'react';

import { SoundTag as SoundTagPropType } from '../proptypes';

const SoundTag = ({ tag }) => (
  <span>
    #
    {tag.name}
  </span>
);

SoundTag.propTypes = {
  tag: SoundTagPropType.isRequired,
};

export default SoundTag;
