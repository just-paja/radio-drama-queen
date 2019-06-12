import React from 'react'

import { VolumeControl } from '..'
import { renderWithContainers } from '../../../../mock'

describe('VolumeControl component', () => {
  it('renders volume toggle button', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    )
    expect(comp.find('VolumeToggleButton')).toHaveLength(1)
  })

  it('renders slider', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    )
    expect(comp.find('Slider')).toHaveLength(1)
  })

  it('renders slider with zero value given the sound is muted', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
        muted
      />
    )
    expect(comp.find('Slider')).toHaveProp('value', 0)
  })

  it('renders slider with actual value given the sound is not muted', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={() => {}}
        volume={0.5}
        muted={false}
      />
    )
    expect(comp.find('Slider')).toHaveProp('value', 0.5)
  })

  it('triggers onMuteToggle on volume toggle button click', () => {
    const onMuteToggle = jest.fn()
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        onMuteToggle={onMuteToggle}
        volume={0.5}
      />
    )
    comp.find('VolumeToggleButton').simulate('click')
    expect(onMuteToggle).toHaveBeenCalled()
  })

  it('triggers onChange on volume slider change', () => {
    const onChange = jest.fn()
    const comp = renderWithContainers(
      <VolumeControl
        onChange={onChange}
        onMuteToggle={() => {}}
        volume={0.5}
      />
    )
    comp.find('Slider').props().onChange()
    expect(onChange).toHaveBeenCalled()
  })
})
