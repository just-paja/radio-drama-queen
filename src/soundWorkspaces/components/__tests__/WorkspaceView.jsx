import React from 'react';

import { shallow } from 'enzyme';

import { WorkspaceView } from '..';

describe('WorkspaceView component', () => {
  it('renders sound gallery view when viewing library', () => {
    const comp = shallow(
      <WorkspaceView
        view="VIEW_LIBRARY"
      />
    );
    expect(comp).toContainMatchingElements(1, 'Connect(SoundGalleryView)');
  });

  it('renders sound board when viewing sound boards', () => {
    const comp = shallow(
      <WorkspaceView
        board="test123"
        view="VIEW_BOARD"
      />
    );
    expect(comp).toContainMatchingElements(1, 'Connect(SoundBoardView)');
  });

  it('renders empty when given board view but no board', () => {
    const comp = shallow(
      <WorkspaceView
        view="VIEW_BOARD"
      />
    );
    expect(comp).toBeEmptyRender();
  });

  it('renders empty when given no view', () => {
    const comp = shallow(
      <WorkspaceView />
    );
    expect(comp).toBeEmptyRender();
  });
});
