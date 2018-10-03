import React from 'react';

import { shallow } from 'enzyme';

import { SoundCategoryExclusiveButton } from '..';

describe('SoundCategoryExclusiveButton component', () => {
  it('renders in primary color given it is on', () => {
    const comp = shallow(
      <SoundCategoryExclusiveButton
        onClick={() => {}}
        exclusive
      />
    );
    expect(comp.find('SoundCategoryIconButton')).toHaveProp('color', 'primary');
  });

  it('renders in default color given it is off', () => {
    const comp = shallow(
      <SoundCategoryExclusiveButton
        onClick={() => {}}
        exclusive={false}
      />
    );
    expect(comp.find('SoundCategoryIconButton')).toHaveProp('color', 'default');
  });
});
