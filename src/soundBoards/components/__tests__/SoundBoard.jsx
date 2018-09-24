import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoard } from '..';

describe('SoundBoard component', () => {
  it('renders empty message when there are no categories', () => {
    const comp = shallow(
      <SoundBoard
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive()).toContainMatchingElements(1, 'SoundBoardEmptyMessage');
  });

  it('renders board speed dial', () => {
    const comp = shallow(
      <SoundBoard
        categories={[]}
        connectDropTarget={nodes => nodes}
      />
    );
    expect(comp.dive()).toContainMatchingElements(1, 'Connect(SoundBoardSpeedDial)');
  });
});
