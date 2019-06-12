import React from 'react'

import { shallow } from 'enzyme'

import { SoundBoardEmptyMessage } from '..'

describe('SoundBoardEmptyMessage component', () => {
  it('renders CanvasMessage', () => {
    const comp = shallow(<SoundBoardEmptyMessage />)
    expect(comp.dive()).toContainMatchingElements(1, 'CanvasMessage')
  })
})
