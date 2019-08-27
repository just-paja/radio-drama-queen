import React from 'react'

import { CategoryControls } from '..'
import { categoryRoutines } from '../../actions'
import { renderWithContainers } from '../../../mock'

describe('CategoryControls component', () => {
  it('renders volume control with category volume', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    expect(comp.find('WithStyles(VolumeControl)')).toHaveProp('volume', 0.5)
  })

  it('renders volume control muted given category is muted', () => {
    const state = {
      entities: {
        categories: [
          {
            muted: true,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    expect(comp.find('WithStyles(VolumeControl)')).toHaveProp('muted', true)
  })

  it('renders category stop button playing given category is playing', () => {
    const state = {
      entities: {
        categories: [
          {
            sounds: ['sound-1'],
            uuid: 'category-1',
            volume: 0.5
          }
        ],
        sounds: [
          {
            playing: true,
            uuid: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    expect(comp.find('SoundCategoryStopButton')).toHaveProp('playing', true)
  })

  it('renders category loop button in loop given category is in loop', () => {
    const state = {
      entities: {
        categories: [
          {
            loop: true,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    expect(comp.find('SoundCategoryLoopButton')).toHaveProp('loop', true)
  })

  it('renders category exclusive button exclusive given category is exclusive', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: true,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    expect(comp.find('SoundCategoryExclusiveButton')).toHaveProp('exclusive', true)
  })

  it('dispatches loopOn when loop button is clicked', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            loop: false,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('SoundCategoryLoopButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.loopOn('category-1'))
  })

  it('dispatches loopOff when loop button is clicked', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            loop: true,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('SoundCategoryLoopButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.loopOff('category-1'))
  })

  it('dispatches onStop when stop button is clicked', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            sounds: ['sound-1'],
            uuid: 'category-1',
            volume: 0.5
          }
        ],
        sounds: [
          {
            playing: true,
            uuid: 'sound-1'
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('SoundCategoryStopButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.stop('category-1'))
  })

  it('dispatches volume change when volume changes', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('VolumeControl').props().onChange(0.75)
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.setVolume({
      uuid: 'category-1',
      volume: 0.75
    }))
  })

  it('dispatches onMute when volume gets muted', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('VolumeToggleButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.mute('category-1'))
  })

  it('dispatches exclusiveOn when exclusive button is clicked', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: false,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('SoundCategoryExclusiveButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.exclusiveOn('category-1'))
  })

  it('dispatches exclusiveOff when exclusive button is clicked', () => {
    const state = {
      entities: {
        categories: [
          {
            exclusive: true,
            uuid: 'category-1',
            volume: 0.5
          }
        ]
      }
    }
    const comp = renderWithContainers(<CategoryControls uuid='category-1' />, state)
    comp.find('SoundCategoryExclusiveButton').simulate('click')
    expect(comp.store.getActions()).toContainEqual(categoryRoutines.exclusiveOff('category-1'))
  })
})
