import React from 'react';

import { SoundTag as SoundTagPropType } from '../proptypes';

const SoundTag = ({ tag }) => (
  tag ? (
    <span>
      #
      {(tag.title && tag.title.cs) || tag.name}
    </span>
  ) : null
);

SoundTag.propTypes = {
  tag: SoundTagPropType,
};

SoundTag.defaultProps = {
  tag: null,
};

export default SoundTag;
