import React from 'react';

import { shallow } from 'enzyme';

import { WorkspaceSelection } from '..';

describe('WorkspaceSelection component', () => {
  it('renders view library button', () => {
    const comp = shallow(
      <WorkspaceSelection
        onBoardSelect={() => {}}
        onViewSelect={() => {}}
      />
    );
    expect(comp.dive().find('[value="VIEW_LIBRARY"]')).toHaveLength(1);
  });

  it('renders board selection', () => {
    const comp = shallow(
      <WorkspaceSelection
        onBoardSelect={() => {}}
        onViewSelect={() => {}}
      />
    );
    expect(comp.dive()).toContainMatchingElements(1, 'Connect(SoundBoardSelection)');
  });
});
