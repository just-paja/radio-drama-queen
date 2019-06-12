import React from 'react'

import { renderWithContainers } from '../../../../mock'
import { SoundLibraryStatus } from '..'

describe('SoundLibraryStatus component', () => {
  it('renders playing sounds count', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: '1',
            playing: true
          },
          {
            uuid: '2',
            playing: true
          },
          {
            uuid: '3',
            playing: false
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').first()).toIncludeText('2')
  })

  it('renders registered sounds count', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: '1',
            playing: true
          },
          {
            uuid: '2',
            playing: true
          },
          {
            uuid: '3',
            playing: false
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').at(5)).toIncludeText('3')
  })

  it('renders board sounds count', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: '1',
            playing: true
          },
          {
            uuid: '2',
            playing: true
          },
          {
            uuid: '3',
            playing: false
          }
        ]
      },
      soundBoards: {
        list: [
          {
            uuid: 'xxx',
            categories: ['x1']
          }
        ]
      },
      soundCategories: {
        list: [
          {
            uuid: 'x1',
            sounds: ['1', '3']
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').at(4)).toIncludeText('2')
  })

  it('renders error sounds count', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: '1',
            playing: false,
            error: new Error('foo')
          },
          {
            uuid: '2',
            playing: true
          },
          {
            uuid: '3',
            playing: false,
            error: new Error('foo')
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').at(2)).toIncludeText('2')
  })

  it('renders in memory sounds count', () => {
    const state = {
      sounds: {
        list: [
          {
            uuid: '1',
            playing: false,
            valid: true
          },
          {
            uuid: '2',
            playing: true
          },
          {
            uuid: '3',
            playing: false,
            valid: true
          }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').at(3)).toIncludeText('2')
  })

  it('renders tag count', () => {
    const state = {
      soundTags: {
        list: [
          { name: '1' },
          { name: '2' },
          { name: '3' }
        ]
      }
    }
    const comp = renderWithContainers(<SoundLibraryStatus />, state)
    expect(comp.find('.SoundLibraryStatus-stat-2').at(1)).toIncludeText('3')
  })
})
