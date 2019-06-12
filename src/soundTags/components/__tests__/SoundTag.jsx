import SoundTag from '../SoundTag'
import React from 'react'

import { renderWithContainers } from '../../../../mock'

describe('SoundTag component', () => {
  it('renders tag name', () => {
    const comp = renderWithContainers(
      <SoundTag
        tag={{
          name: 'foo'
        }}
      />
    )
    expect(comp).toIncludeText('foo')
  })

  it('renders empty when given null tag', () => {
    const comp = renderWithContainers(
      <SoundTag tag={null} />
    )
    expect(comp).toBeEmptyRender()
  })

  it('triggers onClick with tag name on button click', () => {
    const onClick = jest.fn()
    const comp = renderWithContainers(
      <SoundTag
        tag={{
          name: 'foo'
        }}
        onClick={onClick}
      />
    )
    comp.find('button').simulate('click')
    expect(onClick).toHaveBeenCalledWith('foo')
  })

  it('given onClick is not passed, does not fail, when clicked', () => {
    const comp = renderWithContainers(
      <SoundTag
        tag={{
          name: 'foo'
        }}
      />
    )
    expect(() => {
      comp.find('button').simulate('click')
    }).not.toThrow()
  })
})
