import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardLabel } from '..';

describe('SoundBoardLabel component', () => {
  it('renders board name', () => {
    const comp = shallow(
      <SoundBoardLabel
        board={{
          name: 'foo',
        }}
      />
    ).dive();
    expect(comp).toIncludeText('foo');
  });

  it('renders audiotrack icon when playing', () => {
    const comp = shallow(
      <SoundBoardLabel
        board={{
          name: 'foo',
          playing: true,
        }}
      />
    ).dive();
    expect(comp).toContainMatchingElements(1, 'AudiotrackIcon');
  });

  it('does not render audiotrack icon when not playing', () => {
    const comp = shallow(
      <SoundBoardLabel
        board={{
          name: 'foo',
          playing: false,
        }}
      />
    ).dive();
    expect(comp).not.toContainMatchingElements(1, 'pure(AudiotrackIcon)');
  });
});
