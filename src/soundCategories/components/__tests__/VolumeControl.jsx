import React from 'react'

import { VolumeControl } from '..'
import { renderWithContainers } from '../../../mock'

describe('VolumeControl component', () => {
  it('renders slider', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
        volume={0.5}
      />
    )
    expect(comp.find('Slider')).toHaveLength(1)
  })

  it('renders slider with zero value given the sound is muted', () => {
    const comp = renderWithContainers(
      <VolumeControl
        onChange={() => {}}
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
        volume={0.5}
        muted={false}
      />
    )
    expect(comp.find('Slider')).toHaveProp('value', 0.5)
  })

  it('triggers onChange on volume slider change', () => {
    const onChange = jest.fn()
    const comp = renderWithContainers(
      <VolumeControl
        onChange={onChange}
        volume={0.5}
      />
    )
    comp.find('Slider').props().onChange()
    expect(onChange).toHaveBeenCalled()
  })
})
