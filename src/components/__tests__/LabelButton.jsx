import React from 'react'

import { LabelButton } from '..'
import { mount } from 'enzyme'

describe('LabelButton component', () => {
  it('does not throw given icon is null', () => {
    expect(() => {
      mount(<LabelButton icon={null}>Button label</LabelButton>)
    }).not.toThrow()
  })

  it('renders icon when provided', () => {
    const Icon = () => null
    const comp = mount(<LabelButton icon={Icon}>Button label</LabelButton>)
    expect(comp).toContainMatchingElement('Icon')
  })

  it('renders passed text', () => {
    const comp = mount(<LabelButton>Button label</LabelButton>)
    expect(comp).toIncludeText('Button label')
  })
})
