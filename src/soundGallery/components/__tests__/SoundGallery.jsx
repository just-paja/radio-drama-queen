import React from 'react';
import { shallow } from 'enzyme';

import SoundGallery from '../SoundGallery';

describe('SoundGallery component', () => {
  it('renders each sound as SoundGalleryItem', () => {
    const comp = shallow(
      <SoundGallery
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
    );
    expect(comp.find('SoundGalleryItem')).toHaveLength(2);
  });
});
