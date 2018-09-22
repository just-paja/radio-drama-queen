import React from 'react';
import { shallow } from 'enzyme';

import SoundTag from '../SoundTag';

describe('SoundTag component', () => {
  it('renders tag name', () => {
    const comp = shallow(
      <SoundTag
        tag={{
          name: 'foo',
        }}
      />
    );
    expect(comp).toIncludeText('foo');
  });
});
