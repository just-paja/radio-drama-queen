import React from 'react'

import { shallow } from 'enzyme'

import { SoundName } from '..'

describe('SoundName component', () => {
  it('renders sound name when available', () => {
    const comp = shallow(<SoundName name='foo' uuid='bar' />)
    expect(comp).toIncludeText('foo')
  })

  it('renders sound uuid when name is not available', () => {
    const comp = shallow(<SoundName uuid='bar' />)
    expect(comp).toIncludeText('bar')
  })
})
