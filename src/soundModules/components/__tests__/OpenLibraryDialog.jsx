import React from 'react'
import { shallow } from 'enzyme'

import OpenLibraryDialog from '../OpenLibraryDialog'

describe('OpenLibraryDialog component', () => {
  it('renders url input', () => {
    const comp = shallow(
      <OpenLibraryDialog
        handleSubmit={() => {}}
        onClose={() => {}}
        open
      />
    )
    expect(comp.find('Field[name="url"]')).toHaveLength(1)
  })

  it('renders open button as submit', () => {
    const comp = shallow(
      <OpenLibraryDialog
        handleSubmit={() => {}}
        onClose={() => {}}
        open
      />
    )
    expect(comp.find('OpenButton')).toHaveProp('type', 'submit')
  })
})
