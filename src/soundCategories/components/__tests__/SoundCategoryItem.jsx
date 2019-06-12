import React from 'react'

import { shallow } from 'enzyme'

import { SoundCategoryItem } from '..'

describe('SoundCategoryItem component', () => {
  it('renders empty given connectDragSource is empty', () => {
    const comp = shallow(
      <SoundCategoryItem
        onToggle={() => {}}
        connectDragSource={null}
        sound={{
          error: null,
          loading: false,
          playing: true,
          uuid: 'sound-1'
        }}
      />
    ).dive()
    expect(comp).toBeEmptyRender()
  })

  it('renders status icon with props', () => {
    const comp = shallow(
      <SoundCategoryItem
        onToggle={() => {}}
        connectDragSource={children => children}
        sound={{
          error: null,
          loading: false,
          playing: true,
          uuid: 'sound-1'
        }}
      />
    ).dive()
    expect(comp.find('SoundStatusIcon').props()).toMatchObject({
      error: null,
      loading: false,
      playing: true
    })
  })

  it('renders sound name', () => {
    const comp = shallow(
      <SoundCategoryItem
        onToggle={() => {}}
        connectDragSource={children => children}
        sound={{
          error: null,
          loading: false,
          playing: true,
          uuid: 'sound-1'
        }}
      />
    ).dive()
    expect(comp.find('SoundName')).toHaveLength(1)
  })

  it('renders disabled given sound has an error', () => {
    const comp = shallow(
      <SoundCategoryItem
        onToggle={() => {}}
        connectDragSource={children => children}
        sound={{
          error: new Error('Test!'),
          loading: false,
          playing: true,
          uuid: 'sound-1'
        }}
      />
    ).dive()
    expect(comp.find('button')).toHaveProp('disabled', true)
  })

  it('triggers onToggle with sound uuid when clicked', () => {
    const onToggle = jest.fn()
    const comp = shallow(
      <SoundCategoryItem
        onToggle={onToggle}
        connectDragSource={children => children}
        sound={{
          error: new Error('Test!'),
          loading: false,
          playing: true,
          uuid: 'sound-1'
        }}
      />
    ).dive()
    comp.find('button').simulate('click')
    expect(onToggle).toHaveBeenCalledWith('sound-1')
  })
})
