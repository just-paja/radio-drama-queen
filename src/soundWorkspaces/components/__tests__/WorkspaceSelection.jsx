import React from 'react'

import { shallow } from 'enzyme'

import { WorkspaceSelection } from '..'

describe('WorkspaceSelection component', () => {
  it('renders view library button', () => {
    const comp = shallow(
      <WorkspaceSelection
        onBoardSelect={() => {}}
        onViewSelect={() => {}}
      />
    )
    expect(comp.dive().find('[value="VIEW_LIBRARY"]')).toHaveLength(1)
  })

  it('renders board selection', () => {
    const comp = shallow(
      <WorkspaceSelection
        onBoardSelect={() => {}}
        onViewSelect={() => {}}
      />
    )
    expect(comp.dive()).toContainMatchingElements(1, 'Connect(SoundBoardSelection)')
  })

  it('triggers view change on toggle button group change', () => {
    const onViewSelect = jest.fn()
    const comp = shallow(
      <WorkspaceSelection
        onBoardSelect={() => {}}
        onViewSelect={onViewSelect}
      />
    ).dive()
    comp.find('WithStyles(ForwardRef(ToggleButton))').first().simulate('change', null, 'VIEW_LIBRARY')
    expect(onViewSelect).toHaveBeenCalledWith('VIEW_LIBRARY')
  })
})
