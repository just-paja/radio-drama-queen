import React from 'react'

import { CategoryItem } from '..'
import { renderWithDnd } from '../../../mock'
import { soundRoutines } from '../../../sounds/actions'

describe('CategoryItem component', () => {
  it('renders status icon with props', () => {
    const state = {
      entities: {
        sounds: [
          {
            loading: false,
            playing: true,
            cachePath: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(<CategoryItem categoryUuid='category-1' uuid='sound-1' />, state)
    expect(comp.find('SoundStatusIcon').props()).toMatchObject({
      error: null,
      loading: false,
      playing: true
    })
  })

  it('renders sound name', () => {
    const state = {
      entities: {
        sounds: [
          {
            name: 'The Sound of Silence',
            loading: false,
            playing: true,
            cachePath: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(<CategoryItem categoryUuid='category-1' uuid='sound-1' />, state)
    expect(comp.find('SoundName')).toHaveLength(1)
  })

  it('renders disabled given sound has an error', () => {
    const state = {
      entities: {
        sounds: [
          {
            error: new Error('Test!'),
            loading: false,
            playing: true,
            cachePath: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(<CategoryItem categoryUuid='category-1' uuid='sound-1' />, state)
    expect(comp.find('button')).toHaveProp('disabled', true)
  })

  it('given error is not empty, it does not dispatche sound toggle with sound cachePath when clicked', () => {
    const state = {
      entities: {
        sounds: [
          {
            error: new Error('Test!'),
            loading: false,
            playing: true,
            cachePath: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(<CategoryItem categoryUuid='category-1' uuid='sound-1' />, state)
    comp.find('button').simulate('click')
    expect(comp.store.getActions()).not.toContainEqual(soundRoutines.toggle('sound-1'))
  })

  it('given error is empty, it dispatches sound toggle with sound cachePath when clicked', () => {
    const state = {
      entities: {
        sounds: [
          {
            loading: false,
            playing: true,
            cachePath: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithDnd(<CategoryItem categoryUuid='category-1' uuid='sound-1' />, state)
    comp.find('button').simulate('click')
    expect(comp.store.getActions()).toContainEqual(soundRoutines.toggle('sound-1'))
  })
})
