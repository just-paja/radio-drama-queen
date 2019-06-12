import React from 'react'

import { shallow } from 'enzyme'

import { SoundCategoryLoopButton } from '..'

describe('SoundCategoryLoopButton component', () => {
  it('renders in primary color given it is on', () => {
    const comp = shallow(
      <SoundCategoryLoopButton
        onClick={() => {}}
        loop
      />
    )
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'primary')
  })

  it('renders in default color given it is off', () => {
    const comp = shallow(
      <SoundCategoryLoopButton
        onClick={() => {}}
        loop={false}
      />
    )
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'default')
  })
})
