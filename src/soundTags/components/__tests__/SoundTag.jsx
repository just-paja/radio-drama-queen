import React from 'react'

import { renderWithContainers } from '../../../mock'
import { SoundTag } from '..'

describe('SoundTag component', () => {
  it('renders tag name', () => {
    const state = {
      entities: {
        tags: [
          {
            name: 'foo'
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundTag tag='foo' />, state)
    expect(comp).toIncludeText('foo')
  })

  it('renders empty when given null tag', () => {
    const comp = renderWithContainers(<SoundTag tag={null} />)
    expect(comp).toBeEmptyRender()
  })

  it('triggers onClick with tag name on button click', () => {
    const state = {
      entities: {
        tags: [
          {
            name: 'foo'
          }
        ]
      }
    }
    const onClick = jest.fn()
    const comp = renderWithContainers(
      <SoundTag tag='foo' onClick={onClick} />,
      state
    )
    comp.find('button').simulate('click')
    expect(onClick).toHaveBeenCalledWith('foo')
  })

  it('given onClick is not passed, does not fail, when clicked', () => {
    const state = {
      entities: {
        tags: [
          {
            name: 'foo'
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundTag tag='foo' />, state)
    expect(() => {
      comp.find('button').simulate('click')
    }).not.toThrow()
  })
})
