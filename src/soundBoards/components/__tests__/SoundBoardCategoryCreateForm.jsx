import React from 'react'

import { shallow } from 'enzyme'

import { SoundBoardCategoryCreateForm } from '..'

describe('SoundBoardCategoryCreateForm component', () => {
  it('renders name field', () => {
    const comp = shallow(
      <SoundBoardCategoryCreateForm
        handleSubmit={() => {}}
        onCancel={() => {}}
      />
    )
    expect(comp.find('Field[name="name"]')).toHaveLength(1)
  })

  it('triggers handleSubmit on form submit', () => {
    const handleSubmit = jest.fn()
    const comp = shallow(
      <SoundBoardCategoryCreateForm
        handleSubmit={handleSubmit}
        onCancel={() => {}}
      />
    )
    comp.find('Form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('renders save button', () => {
    const onCancel = jest.fn()
    const comp = shallow(
      <SoundBoardCategoryCreateForm
        handleSubmit={() => {}}
        onCancel={onCancel}
      />
    )
    expect(comp.find('SaveButton')).toHaveLength(1)
  })

  it('triggers onCancel on cancel button click', () => {
    const onCancel = jest.fn()
    const comp = shallow(
      <SoundBoardCategoryCreateForm
        handleSubmit={() => {}}
        onCancel={onCancel}
      />
    )
    comp.find('CancelButton').simulate('click')
    expect(onCancel).toHaveBeenCalled()
  })
})
