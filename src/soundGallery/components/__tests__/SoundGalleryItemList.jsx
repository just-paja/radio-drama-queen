import React from 'react';
import { shallow } from 'enzyme';

import SoundGalleryItemList from '../SoundGalleryItemList';

describe('SoundGalleryItemList component', () => {
  it('renders each sound as SoundGalleryItem', () => {
    const comp = shallow(
      <SoundGalleryItemList
        onSoundAdd={() => {}}
        onTagAdd={() => {}}
        onSoundPlay={() => {}}
        sounds={[
          {
            name: 'foo',
            uuid: 'foo',
            tags: [],
          },
          {
            name: 'bar',
            uuid: 'bar',
            tags: [],
          },
        ]}
      />
    ).dive();
    expect(comp.find('WithStyles(SoundGalleryItem)')).toHaveLength(2);
  });
});
