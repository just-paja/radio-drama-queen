import React from 'react';

import { shallow } from 'enzyme';

import { SoundBoardMessage } from '..';

describe('SoundBoardMessage component', () => {
  it('renders the message', () => {
    const comp = shallow(
      <SoundBoardMessage heading="The header">
        The Message
      </SoundBoardMessage>
    );
    expect(comp.dive().find({
      children: 'The Message',
    })).toHaveLength(1);
  });

  it('renders the heading', () => {
    const comp = shallow(
      <SoundBoardMessage heading="The Heading">
        The Message
      </SoundBoardMessage>
    );
    expect(comp.dive().find({
      children: 'The Heading',
    })).toHaveLength(1);
  });
});
