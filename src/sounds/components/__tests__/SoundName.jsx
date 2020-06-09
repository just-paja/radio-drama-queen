import React from 'react'

import { shallow } from 'enzyme'

import { SoundName } from '..'

describe('SoundName component', () => {
  it('renders sound name when available', () => {
    const comp = shallow(<SoundName name='foo' cachePath='bar' />)
    expect(comp).toIncludeText('foo')
  })

  it('renders sound cachePath when name is not available', () => {
    const comp = shallow(<SoundName cachePath='bar' />)
    expect(comp).toIncludeText('bar')
  })
})
