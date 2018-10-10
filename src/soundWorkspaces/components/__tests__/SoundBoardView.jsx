import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardView } from '..';

describe('SoundBoardView component', () => {
  it('renders sound board when viewing sound boards', () => {
    const comp = shallow(
      <SoundBoardView
        board="test123"
        onSoundPickerOpen={() => {}}
      />
    );
    expect(comp.find('Connect(SoundBoard)')).toHaveProp('uuid', 'test123');
  });
});
