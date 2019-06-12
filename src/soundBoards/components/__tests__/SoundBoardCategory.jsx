import React from 'react'

import { shallow } from 'enzyme'

import { SoundBoardCategory } from '..'

describe('SoundBoardCategory component', () => {
  it('renders sound category when given uuid', () => {
    const comp = shallow(
      <SoundBoardCategory uuid={'foo'} />
    ).dive()
    expect(comp.find('Connect(SoundCategory)')).toHaveProp('uuid', 'foo')
  })

  it('renders children when given no uuid', () => {
    const comp = shallow(
      <SoundBoardCategory>
        <div id='foo' />
      </SoundBoardCategory>
    ).dive()
    expect(comp.find('#foo')).toHaveLength(1)
  })
})
