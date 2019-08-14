import React from 'react'

import { AppError } from '..'
import { mount } from 'enzyme'

describe('AppError component', () => {
  it('renders empty given error is null', () => {
    const comp = mount(<AppError error={null} />)
    expect(comp).toBeEmptyRender()
  })

  it('renders error message given error is instance of Error', () => {
    const comp = mount(<AppError error={new Error('Test error message!')} />)
    expect(comp).toIncludeText('Test error message!')
  })

  it('renders text given error is string', () => {
    const comp = mount(<AppError error='Test error message!' />)
    expect(comp).toIncludeText('Test error message!')
  })
})
