import React from 'react'

import { shallow } from 'enzyme'

import { SoundCategoryControls } from '..'

describe('SoundCategoryControls component', () => {
  it('renders volume control with category volume', () => {
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
      />
    )
    expect(comp.find('WithStyles(VolumeControl)')).toHaveProp('volume', 0.5)
  })

  it('renders volume control muted given category is muted', () => {
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        muted
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
      />
    )
    expect(comp.find('WithStyles(VolumeControl)')).toHaveProp('muted', true)
  })

  it('renders category stop button playing given category is playing', () => {
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        playing
        volume={0.5}
      />
    )
    expect(comp.find('SoundCategoryStopButton')).toHaveProp('playing', true)
  })

  it('renders category loop button in loop given category is in loop', () => {
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        loop
      />
    )
    expect(comp.find('SoundCategoryLoopButton')).toHaveProp('loop', true)
  })

  it('renders category exclusive button exclusive given category is exclusive', () => {
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    expect(comp.find('SoundCategoryExclusiveButton')).toHaveProp('exclusive', true)
  })

  it('triggers onLoopToggle when loop button is clicked', () => {
    const onLoopToggle = jest.fn()
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={onLoopToggle}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    comp.find('SoundCategoryLoopButton').simulate('click')
    expect(onLoopToggle).toHaveBeenCalledWith('category-1')
  })

  it('triggers onStop when stop button is clicked', () => {
    const onStop = jest.fn()
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={onStop}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    comp.find('SoundCategoryStopButton').simulate('click')
    expect(onStop).toHaveBeenCalledWith('category-1')
  })

  it('triggers volume change when volume changes', () => {
    const onVolumeChange = jest.fn()
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={onVolumeChange}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    comp.find('WithStyles(VolumeControl)').simulate('change', 0.75)
    expect(onVolumeChange).toHaveBeenCalledWith('category-1', 0.75)
  })

  it('triggers onMuteToggle when volume gets muted', () => {
    const onMuteToggle = jest.fn()
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={() => {}}
        onLoopToggle={() => {}}
        onMuteToggle={onMuteToggle}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    comp.find('WithStyles(VolumeControl)').simulate('muteToggle')
    expect(onMuteToggle).toHaveBeenCalledWith('category-1')
  })

  it('triggers onExclusiveToggle when exclusive button is clicked', () => {
    const onExclusiveToggle = jest.fn()
    const comp = shallow(
      <SoundCategoryControls
        onExclusiveToggle={onExclusiveToggle}
        onLoopToggle={() => {}}
        onMuteToggle={() => {}}
        onStop={() => {}}
        onVolumeChange={() => {}}
        uuid='category-1'
        volume={0.5}
        exclusive
      />
    )
    comp.find('SoundCategoryExclusiveButton').simulate('click')
    expect(onExclusiveToggle).toHaveBeenCalledWith('category-1')
  })
})
