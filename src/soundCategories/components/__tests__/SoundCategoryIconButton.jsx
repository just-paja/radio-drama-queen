import React from 'react';

import { shallow } from 'enzyme';

import { SoundCategoryIconButton } from '..';

describe('SoundCategoryIconButton component', () => {
  it('renders mui icon button with chosen icon', () => {
    const icon = () => {};
    const comp = shallow(
      <SoundCategoryIconButton
        icon={icon}
      />
    );
    expect(comp.find(icon)).toHaveLength(1);
  });
});
