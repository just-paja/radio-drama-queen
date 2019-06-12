import React from 'react'

import { shallow } from 'enzyme'

import { VolumeToggleButton } from '..'

describe('VolumeToggleButton component', () => {
  it('renders in primary color given it is muted', () => {
    const comp = shallow(
      <VolumeToggleButton
        onClick={() => {}}
        muted
      />
    )
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'primary')
  })

  it('renders in default color given it is not muted', () => {
    const comp = shallow(
      <VolumeToggleButton
        onClick={() => {}}
        muted={false}
      />
    )
    expect(comp.find('WithStyles(SoundCategoryIconButton)')).toHaveProp('color', 'default')
  })
})
