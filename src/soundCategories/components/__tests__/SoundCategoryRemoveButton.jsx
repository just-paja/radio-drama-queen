import React from 'react';

import { shallow } from 'enzyme';

import { SoundCategoryRemoveButton } from '..';

describe('SoundCategoryRemoveButton component', () => {
  it('triggers onClick with category uuid when clicked', () => {
    const onClick = jest.fn();
    const comp = shallow(
      <SoundCategoryRemoveButton
        onClick={onClick}
        uuid="category-1"
      />
    );
    comp.find('SoundCategoryIconButton').simulate('click');
    expect(onClick).toHaveBeenCalledWith('category-1');
  });
});
