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
    ).dive();
    expect(comp).toIncludeText('foo');
  });

  it('renders empty when given null tag', () => {
    const comp = shallow(
      <SoundTag tag={null} />
    ).dive();
    expect(comp).toBeEmptyRender();
  });

  it('triggers onClick with tag name on button click', () => {
    const onClick = jest.fn();
    const comp = shallow(
      <SoundTag
        tag={{
          name: 'foo',
        }}
        onClick={onClick}
      />
    ).dive();
    comp.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledWith('foo');
  });

  it('given onClick is not passed, does not fail, when clicked', () => {
    const comp = shallow(
      <SoundTag
        tag={{
          name: 'foo',
        }}
      />
    ).dive();
    expect(() => {
      comp.find('button').simulate('click');
    }).not.toThrow();
  });
});
