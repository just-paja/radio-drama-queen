import React from 'react'

import { renderWithContainers } from '../../../mock'
import { WorkspaceStatus } from '..'

describe('WorkspaceStatus component', () => {
  it('renders playing sounds count', () => {
    const state = {
      entities: {
        sounds: [
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
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').first()).toIncludeText('2')
  })

  it('renders registered sounds count', () => {
    const state = {
      entities: {
        sounds: [
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
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').at(5)).toIncludeText('3')
  })

  it('renders board sounds count', () => {
    const state = {
      entities: {
        sounds: [
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
        ],
        boards: [
          {
            uuid: 'xxx',
            categories: ['x1']
          }
        ],
        categories: [
          {
            uuid: 'x1',
            sounds: ['1', '3']
          }
        ]
      }
    }
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').at(4)).toIncludeText('2')
  })

  it('renders error sounds count', () => {
    const state = {
      entities: {
        sounds: [
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
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').at(2)).toIncludeText('2')
  })

  it('renders in memory sounds count', () => {
    const state = {
      entities: {
        sounds: [
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
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').at(3)).toIncludeText('2')
  })

  it('renders tag count', () => {
    const state = {
      entities: {
        tags: [
          { name: '1' },
          { name: '2' },
          { name: '3' }
        ]
      }
    }
    const comp = renderWithContainers(<WorkspaceStatus />, state)
    expect(comp.find('LibraryStat').at(1)).toIncludeText('3')
  })
})
