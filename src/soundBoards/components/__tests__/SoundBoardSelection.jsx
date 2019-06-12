import React from 'react'

import { SoundBoardSelection } from '..'
import { renderWithContainers } from '../../../../mock'

describe('SoundBoardSelection component', () => {
  it('renders sound board label', () => {
    const onBoardSelect = jest.fn()
    const comp = renderWithContainers(
      <SoundBoardSelection
        activeBoard={null}
        boards={[
          {
            uuid: 'foo',
            name: 'xxx'
          }
        ]}
        onBoardSelect={onBoardSelect}
      />
    )
    expect(comp.find('SoundBoardLabel')).toHaveProp('board', {
      uuid: 'foo',
      name: 'xxx'
    })
  })

  it('triggers onBoardSelect board button click with board uuid', () => {
    const onBoardSelect = jest.fn()
    const comp = renderWithContainers(
      <SoundBoardSelection
        activeBoard={null}
        boards={[
          {
            uuid: 'foo',
            name: 'xxx'
          },
          {
            uuid: 'bar',
            name: 'yyy'
          }
        ]}
        onBoardSelect={onBoardSelect}
      />
    )
    comp.find('ForwardRef(ToggleButton)').first().props().onChange({}, 'foo')
    expect(onBoardSelect).toHaveBeenCalledWith('foo')
  })

  it('triggers onBoardSelect board button click with active board uuid when value is null', () => {
    const onBoardSelect = jest.fn()
    const comp = renderWithContainers(
      <SoundBoardSelection
        activeBoard='foo'
        boards={[
          {
            uuid: 'foo',
            name: 'xxx'
          },
          {
            uuid: 'bar',
            name: 'yyy'
          }
        ]}
        onBoardSelect={onBoardSelect}
      />
    )
    comp.find('ForwardRef(ToggleButton)').first().props().onChange({}, null)
    expect(onBoardSelect).toHaveBeenCalledWith('foo')
  })
})
