import React from 'react';

import { shallow } from 'enzyme';

import CanvasMessage from '../CanvasMessage';

describe('CanvasMessage component', () => {
  it('renders the message', () => {
    const comp = shallow(
      <CanvasMessage heading="The header">
        The Message
      </CanvasMessage>
    );
    expect(comp.dive().find({
      children: 'The Message',
    })).toHaveLength(1);
  });

  it('renders the heading', () => {
    const comp = shallow(
      <CanvasMessage heading="The Heading">
        The Message
      </CanvasMessage>
    );
    expect(comp.dive().find({
      children: 'The Heading',
    })).toHaveLength(1);
  });
});
